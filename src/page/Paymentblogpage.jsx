import React, { useState, useEffect } from 'react';
import './Paymentblogpage.css'; // Import CSS file for styling
import api from '../components/utils/requestAPI';

const Paymentblogpage = () => {
    const [productInfo, setProductInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const orderId = "O2037b1"; // Đặt orderId vào đây

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API để lấy thông tin đơn hàng dựa trên orderId
                const orderResponse = await api.get(`https://localhost:7227/api/Order/get-by-id-true?id=${orderId}`);
                const orderData = orderResponse.data;

                // Lấy userId từ dữ liệu đơn hàng
                const userId = orderData.userId;

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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [orderId]);

    if (!productInfo || !userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="payment-blog-page">
             <h2 className="info-title">Thông tin sản phẩm</h2>
            <div className="product-info">
           
            <div className="product-info-image">  <img src={productInfo.imageUrl} alt="Sản phẩm" className="product-imagez" /> </div>
              
                <div className="product-info-content">
                <p className="info-item">Tên sản phẩm: {productInfo.name}</p>
                <p className="info-item">Giá: {productInfo.price}</p>
                </div>
            </div>
            <hr className="divider" />
            <div className="user-infos">
                <h2 className="info-title">Thông tin người dùng</h2>
                <p className="info-item">Tên người dùng: {userInfo.username}</p>
              
                <p className="info-item">Địa chỉ: {userInfo.address}</p>
              
            </div>
            <div className="success-text">
    <p className="success">Đơn hàng thành công</p>
</div>
        </div>
    );
}

export default Paymentblogpage;
