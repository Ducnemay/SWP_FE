import React, { useState, useEffect } from 'react';
import './PaymentPremium.css';
import api from '../components/utils/requestAPI';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PaymentPremium = () => {
    const { orderPremiumId } = useParams();
    const [productInfo, setProductInfo] = useState(null);
    const [userArtworkInfo, setUserArtworkInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userNowInfo, setUserNowInfo] = useState(null);
    const [approved, setApproved] = useState(false);
    const { auth } = useAuth();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    let paymentUpdated = false;
    let orderUpdated = false;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for order, user, and other required information
                const orderPremiumResponse = await api.get(`https://localhost:7227/api/OrderPremium/get-order-premeium-by-id?id=${orderPremiumId}`);
                const orderData = orderPremiumResponse.data;

                const userNowResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: auth.user.userId });
                const userNowData = userNowResponse.data;

                const userIdOrder = orderData.userId;
                const userResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userIdOrder });
                const userData = userResponse.data;

                const response = await api.get(`https://localhost:7227/api/User/get all user`);
                const users = response.data.$values;
                const userIdsWithRoleId = users.filter(user => user.roleId === `4`);
                const userIdModer = userIdsWithRoleId.map(user => user.userId);
                const userId_artwork_Respone = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userIdModer[1] });
                const userId_artwork_data = userId_artwork_Respone.data;

                setProductInfo(orderData);
                setUserInfo(userData);
                setUserArtworkInfo(userId_artwork_data);
                setUserNowInfo(userNowData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [orderPremiumId, auth.user.userId]);

    const handleConfirmPayment = async () => {
        try {
            const paymentFromOrderPreId = await api.get(`https://localhost:7227/api/OrderPremiumLog/get-OrderPre-By-LogId?id=${orderPremiumId}`);
            const paymentInfo = paymentFromOrderPreId.data.orderPremiumLogId;

            await api.post(`https://localhost:7227/api/OrderPremiumLog/Update-Status?id=${paymentInfo}`);
            paymentUpdated = true;

            if (paymentUpdated) {
                await api.post(`https://localhost:7227/api/OrderPremium/update-status?id=${orderPremiumId}`);
                orderUpdated = true;
            }

            if (orderUpdated) {
                const data_userArtwok = {
                    money: userArtworkInfo.money + productInfo.total,
                };

                const userRecieve = userArtworkInfo.userId;
                await api.post(`https://localhost:7227/api/User/update-money?id=${userRecieve}`, data_userArtwok);

                const data_userNow = {
                    money: userInfo.money - productInfo.total,
                };

                const userBuy = userInfo.userId;
                await api.post(`https://localhost:7227/api/User/update-money?id=${userBuy}`, data_userNow);

                // Update premium ID in user data
                const updatePremiumIdUrl = `https://localhost:7227/api/OrderPremium/get-orderid-update-premiumid-in-user?OrderPreId=${orderPremiumId}`;
                await api.post(updatePremiumIdUrl);

                alert('Chuyển Tiền Thành Công');
                navigate(`/home`);
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
        }
    };

    if (!productInfo || !userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="paymentpremium-blog-page">
            <div className="paymentpremium-user-info">
                <h2 className="paymentpremium-info-title">Xác Nhận Chuyển Tiền</h2>
                Chuyển tới:<div className="paymentpremium-info-itemss"> {userArtworkInfo.username}</div>
                <h1 className="paymentpremium-info-item">{productInfo.total}</h1>
                <div className='paymentpremium-position-button'>
                    <Link to={`/pre`}>
                        <div>
                            <button className="paymentpremium-blog-button-cancle">CANCLE</button>
                        </div>
                    </Link>
                    <div>
                        <button onClick={() => handleConfirmPayment()} className="paymentpremium-blog-button-cofirm">CONFIRM</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPremium;