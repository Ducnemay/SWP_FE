import React, { useState, useEffect } from 'react';
import './PaymentBank.css'; // Import CSS file for styling
import api from '../components/utils/requestAPI';
import { useParams,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PaymentBank = () => {
    const {userId,artworkUserId,orderId} = useParams();
    const [productInfo, setProductInfo] = useState(null);
    const [userArtworkInfo, setUserArtworkInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userNowInfo, setUserNowInfo] = useState(null);
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

                // Gọi API để lấy thông tin đơn hàng dựa trên orderId
                const orderResponse = await api.get(`https://localhost:7227/api/Order/get-by-id?id=${orderId}`);
                const orderData = orderResponse.data;

                //Lấy thông tin từ userId hiện đang đăng nhập
            const userNowResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userId });
            const  userNowData = userNowResponse.data;

            //     //Lấy thông tin từ userArtworkId 
            // const userNowResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userId });
            // const  userNowData = userNowResponse.data;

                // Lấy userId từ dữ liệu đơn hàng
                const userIdOrder = orderData.userId;

                // Gửi yêu cầu POST để lấy thông tin người dùng dựa trên userId
                const userResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userIdOrder });
                const userData = userResponse.data;

                // Lấy artworkId từ dữ liệu đơn hàng
                const artworkId = orderData.artworkId;

                // Gọi API để lấy thông tin sản phẩm dựa trên artworkId
                const artworkResponse = await api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${artworkId}`);
                const artworkData = artworkResponse.data;

                // Lấy userId từ artwork
                const userId_artwork = artworkData.userId;


                
                // Gửi yêu cầu POST để lấy thông tin người dùng dựa trên userId
                const userId_artwork_Respone = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userId_artwork });
                const userId_artwork_data = userId_artwork_Respone.data

                // Lấy thông tin sản phẩm từ dữ liệu artwork
                const productData = {
                    name: artworkData.title,
                    price: artworkData.price,
                    imageUrl: artworkData.imageUrl // Nếu API trả về đường dẫn ảnh sản phẩm
                    // Thêm các thông tin khác về sản phẩm nếu cần
                };

                // Cập nhật state với thông tin sản phẩm và người dùng
                setProductInfo(productData);
                setUserInfo(userData);
                setUserArtworkInfo(userId_artwork_data);
                setUserNowInfo(userNowData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [orderId]);

    const handleConfirmPayment = async () => {
        try {
            try {
            // Gọi API lấy thông tin payment từ orderId
            const paymentFromOrderId = await api.get(`https://localhost:7227/api/Payment/get-payment-by-order-id?id=${orderId}`);
            const paymentInfo = paymentFromOrderId.data.paymentId; 

            // Gọi API payment cập nhât status thành true 
            await api.post(`https://localhost:7227/api/Payment/update-payment?id=${paymentInfo}`);

             // Nếu cập nhật status của payment thành công
            paymentUpdated = true;
            } catch (error) {
    console.error('Error updating payment status:', error);
            }
            
            if (paymentUpdated) {
                try {
            // Gọi API orderId cập nhât status thành true 
            //
            await api.post(`https://localhost:7227/api/Order/update-order?order=${orderId}`);
            // Nếu cập nhật status của order thành công
            orderUpdated = true;
            } catch (error) {
            console.error('Error updating order status:', error);
            // Xử lý lỗi khi có lỗi xảy ra trong quá trình cập nhật status của orderId
                }
            }

            if (orderUpdated) {
            // Thông tin truyền vào POST để cập nhật số tiền của người sở hữu tranh
            const data_userArtwok = {
                money: userArtworkInfo.money + productInfo.price,
            };

            // Gửi yêu cầu POST để cập nhật số tiền của người sở hữu tranh
            await api.post(`https://localhost:7227/api/User/update-money?id=${artworkUserId}`, data_userArtwok);
            
            // Thông tin truyền vào POST để cập nhật số tiền của người đang đăng nhập
            const data_userNow = {
                money: userNowInfo.money - productInfo.price,
            };

            // Gửi yêu cầu POST để cập nhật số tiền của người đang đăng nhập
            await api.post(`https://localhost:7227/api/User/update-money?id=${userId}`, data_userNow);
            alert('Chuyển Tranh và Chuyển Tiền Thành Công');
            navigate(`/transfer`);
            
        }
        } catch (error) {
            console.error('Error confirming payment:', error);
            // Xử lý lỗi khi có lỗi xảy ra trong quá trình xử lý thanh toán
        }
    }

    if (!productInfo || !userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="paymentbank-blog-page">
            
            <div className="paymentbank-product-info">
            <h2 className="paymentbank-info-title">Xác nhận chuyển Tranh</h2>
                <img src={productInfo.imageUrl} alt="Sản phẩm" className="paymentbank-product-image" />
                <div className="paymentbank-info-item">{userArtworkInfo.username}</div>
                <div className="paymentbank-info-item">{productInfo.name}</div>
                
                Chuyển tới:<div className="paymentbank-info-itemss">{userInfo.username}</div>
                
                <div className='position-button'>
                <Link to={`/transfer`}>
                <div><button className="paymentbank-blog-button-cancle">CANCLE</button>
                       </div>
                       </Link>       
                
                <div><button onClick={() => handleConfirmPayment()}className="paymentbank-blog-button-cofirm">CONFIRM</button>
                       </div>
                       
                       </div>
            </div>
            <div className="paymentbank-user-info">
                <h2 className="paymentbank-info-title">Xác Nhận Chuyển Tiền</h2>
                Chuyển tới:<div className="paymentbank-info-itemss"> {userArtworkInfo.username}</div>
                <h1 className="paymentbank-info-item">{productInfo.price}</h1>
                <div className='height200'></div>
                
                       
                
                
            </div>
        </div>
    );
}

export default PaymentBank;
