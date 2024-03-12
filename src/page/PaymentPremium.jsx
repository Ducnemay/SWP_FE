import React, { useState, useEffect } from 'react';
import './PaymentPremium.css'; // Import CSS file for styling
import api from '../components/utils/requestAPI';
import { useParams,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PaymentPremium = () => {
    const {orderPremiumId} = useParams();
    const [productInfo, setProductInfo] = useState(null);
    const [userArtworkInfo, setUserArtworkInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userNowInfo, setUserNowInfo] = useState(null);
    const [approved, setApproved] = useState(false);
    const { auth } = useAuth();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    // const orderId = "O2037b1"; // Đặt orderId vào đây
    let paymentUpdated = false;
    let orderUpdated = false;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API để lấy thông tin payment
                // const paymentResponse = await api.get(`https://localhost:7227/api/Payment/get-payment-by-order-id?id=${orderId}`);
                // const paymentData = paymentData.data;

                // Gọi API để lấy thông tin đơn hàng dựa trên orderPremiumId
                const orderPremiumResponse = await api.get(`https://localhost:7227/api/OrderPremium/get-order-premeium-by-id?id=${orderPremiumId}`);
                const orderData = orderPremiumResponse.data;

                //Lấy thông tin từ userId hiện đang đăng nhập
            const userNowResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: auth.user.userId });
            const  userNowData = userNowResponse.data;

            //     //Lấy thông tin từ userArtworkId 
            // const userNowResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userId });
            // const  userNowData = userNowResponse.data;

                // Lấy userId từ dữ liệu đơn hàng
                const userIdOrder = orderData.userId;

                // Gửi yêu cầu POST để lấy thông tin người dùng dựa trên userId
                const userResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userIdOrder });
                const userData = userResponse.data;

                 // Gửi yêu cầu POST để lấy thông tin admin
                 const response = await api.get(`https://localhost:7227/api/User/get all user`);
                 const users = response.data.$values;
                 const userIdsWithRoleId = users.filter(user => user.roleId === `4`);
                const userIdModer = userIdsWithRoleId.map(user => user.userId);
                // console.log(userIdModer);
                 const userId_artwork_Respone = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userIdModer[1] });
                 const userId_artwork_data = userId_artwork_Respone.data

                

                // Cập nhật state với thông tin sản phẩm và người dùng
                setProductInfo(orderData);
                setUserInfo(userData);
                setUserArtworkInfo(userId_artwork_data);
                setUserNowInfo(userNowData);
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        fetchData();
    }, [orderPremiumId]);

    const handleConfirmPayment = async () => {
        try {
            try {
            // Gọi API lấy thông tin orderPremiumLog từ orderPremium
            const paymentFromOrderPreId = await api.get(`https://localhost:7227/api/OrderPremiumLog/get-OrderPre-By-LogId?id=${orderPremiumId}`);
            const paymentInfo = paymentFromOrderPreId.data.orderPremiumLogId; 

            // Gọi API payment cập nhât status thành true 
            await api.post(`https://localhost:7227/api/OrderPremiumLog/Update-Status?id=${paymentInfo}`);

             // Nếu cập nhật status của payment thành công
            paymentUpdated = true;
            } catch (error) {
    console.error('Error updating payment premiumLog status:', error);
            }
            
            if (paymentUpdated) {
                try {
            // Gọi API orderId cập nhât status thành true 
            //
            await api.post(`https://localhost:7227/api/OrderPremium/update-status?id=${orderPremiumId}`);
            // Nếu cập nhật status của order thành công
            orderUpdated = true;
            } catch (error) {
            console.error('Error updating order status:', error);
            // Xử lý lỗi khi có lỗi xảy ra trong quá trình cập nhật status của orderId
                }
            }

            if (orderUpdated) {
            // Thông tin truyền vào POST để cập nhật số tiền của moder
            const data_userArtwok = {
                money: userArtworkInfo.money + productInfo.total,  
            };

            // Gửi yêu cầu POST để cập nhật số tiền của người sở hữu tranh
            const userRecieve = userArtworkInfo.userId;
            await api.post(`https://localhost:7227/api/User/update-money?id=${userRecieve}`, data_userArtwok);
            
            // Thông tin truyền vào POST để cập nhật số tiền của người đang đăng nhập
            const data_userNow = {
                money: userInfo.money - productInfo.total,
            };

            // Gửi yêu cầu POST để cập nhật số tiền của người đang đăng nhập
            const userBuy = userInfo.userId
            await api.post(`https://localhost:7227/api/User/update-money?id=${userBuy}`, data_userNow);
            alert('Chuyển Tiền Thành Công');
            navigate(`/home`);
            
        }
        } catch (error) {
            console.error('Error confirming payment:', error);
            // Xử lý lỗi khi có lỗi xảy ra trong quá trình xử lý thanh toán
            console.log(userInfo.userId);
            console.log(userArtworkInfo.userId);
        }
    }

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
                <div><button className="paymentpremium-blog-button-cancle">CANCLE</button>
                       </div>
                       </Link>       
                
                <div><button onClick={() => handleConfirmPayment()}className="paymentpremium-blog-button-cofirm">CONFIRM</button>
                       </div>
                       
                       </div>
                
                       
                
                
            </div>
        </div>
    );
}

export default PaymentPremium;
