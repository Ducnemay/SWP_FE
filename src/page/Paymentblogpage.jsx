import React, { useState, useEffect } from 'react';
import './Paymentblogpage.css'; // Import CSS file for styling
import api from '../components/utils/requestAPI';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Paymentblogpage = () => {
    const {orderId} = useParams();
    const { auth } = useAuth();
    const [user, setUser] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [userArtworkInfo, setUserArtworkInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userNowInfo, setUserNowInfo] = useState(null);
    const [approved, setApproved] = useState(false);
    const navigate = useNavigate();
    // const orderId = "O2037b1"; // Đặt orderId vào đây

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API để lấy thông tin đơn hàng dựa trên orderId
                const orderResponse = await api.get(`https://localhost:7227/api/Order/get-by-id-false?id=${orderId}`);
                const orderData = orderResponse.data;

                 //Lấy thông tin từ userId hiện đang đăng nhập
        //          const response = await api.post("https://localhost:7227/api/User/get-by-id", { userId: auth.user.userId });
        //   setUser(response.data);
            const userNowResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: auth.user.userId });
            const  userNowData = userNowResponse.data;

                // Lấy userId từ dữ liệu đơn hàng
                const userId = orderData.userId;


                // Gửi yêu cầu POST để lấy thông tin admin
                const response = await api.get(`https://localhost:7227/api/User/get all user`);
                const users = response.data.$values;
                const userIdsWithRoleId = users.filter(user => user.roleId === `4`);
               const userIdModer = userIdsWithRoleId.map(user => user.userId);
               
               console.log(userIdModer);
                const userId_artwork_Respone = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userIdModer[1] });
                const userId_artwork_data = userId_artwork_Respone.data
                

                // Gửi yêu cầu POST để lấy thông tin người dùng dựa trên userId
                const userResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userId });
                const userData = userResponse.data;

                // Lấy artworkId từ dữ liệu đơn hàng
                const artworkId = orderData.artworkId;

                // Gọi API để lấy thông tin sản phẩm dựa trên artworkId
                const artworkResponse = await api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${artworkId}`);
                const artworkData = artworkResponse.data;

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
                setUserNowInfo(userNowData);
                setUserArtworkInfo(userId_artwork_data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [orderId]);

    const handleConfirmPayment = async () => {
        try {
    //         try {
    //         // Gọi API lấy thông tin payment từ orderId
    //         const paymentFromOrderId = await api.get(`https://localhost:7227/api/Payment/get-payment-by-order-id?id=${orderId}`);
    //         const paymentInfo = paymentFromOrderId.data.paymentId; 

    //         // Gọi API payment cập nhât status thành true 
    //         await api.post(`https://localhost:7227/api/Payment/update-payment?id=${paymentInfo}`);

    //          // Nếu cập nhật status của payment thành công
    //         paymentUpdated = true;
    //         } catch (error) {
    // console.error('Error updating payment status:', error);
    //         }
            
    //         if (paymentUpdated) {
    //             try {
    //         // Gọi API orderId cập nhât status thành true 
    //         //
    //         await api.post(`https://localhost:7227/api/Order/update-order?order=${orderId}`);
    //         // Nếu cập nhật status của order thành công
    //         orderUpdated = true;
    //         } catch (error) {
    //         console.error('Error updating order status:', error);
    //         // Xử lý lỗi khi có lỗi xảy ra trong quá trình cập nhật status của orderId
    //             }
    //         }

           
            // Thông tin truyền vào POST để cập nhật số tiền của người sở hữu tranh
            const data_userArtwok = {
                money: userArtworkInfo.money + productInfo.price, 
            };

            // Gửi yêu cầu POST để cập nhật số tiền của người morder
            await api.post(`https://localhost:7227/api/User/update-money?id=${userArtworkInfo.userId}`, data_userArtwok);
            
            // Thông tin truyền vào POST để cập nhật số tiền của người đang đăng nhập
            const data_userNow = {
                money: userNowInfo.money - productInfo.price,
            };

            // Gửi yêu cầu POST để cập nhật số tiền của người đang đăng nhập
            await api.post(`https://localhost:7227/api/User/update-money?id=${auth.user.userId}`, data_userNow);
            setApproved(true);
            alert('Chuyển tiền thành công');
            
            navigate(`/transHis`);
            
        
        } catch (error) {
            console.error('Error confirming payment:', error);
            // Xử lý lỗi khi có lỗi xảy ra trong quá trình xử lý thanh toán
        }
    }

    if (!productInfo || !userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="payment-blog-page">
            <div className="payment-product-info">
                <img src={productInfo.imageUrl} alt="Sản phẩm" className="payment-product-image" />
                <h2 className="payment-info-title">Thông tin sản phẩm</h2>
                <div className="payment-info-item">Tên sản phẩm: {productInfo.name}</div>
                <div className="payment-info-item">Giá: {productInfo.price}</div>
            </div>
            <div className="payment-user-info">
                <h2 className="payment-info-title">Thông tin người dùng</h2>
                <div className="payment-info-item">Tên người dùng: {userInfo.username}</div>
                
                <div><button onClick={() => handleConfirmPayment()} className="payment-blog-button-cofirm">CONFIRM</button>
                       </div>
                       
                
                
            </div>
        </div>
    );
}

export default Paymentblogpage;
