// PaymentPage.js

import React, { useState } from 'react';
import './Pay.css';

const PaymentPage = () => {
  const [productInfo, setProductInfo] = useState({
    name: 'Product Name',
    author: 'Author Name',
    price: 50,
    imageUrl: 'https://d7hftxdivxxvm.cloudfront.net/?height=626&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FudkbL2AB8JJqt57cr4k44g%2Flarger.jpg&width=445',
  });

  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    country: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSaveButtonClick = () => {
    console.log('Thông tin sản phẩm:', productInfo);
    console.log('Thông tin khách hàng:', customerInfo);
  };

  return (
    <div className="payment-container">
      <div className="product-info-container">
        <h2>Thông tin sản phẩm</h2>
        <img className="product-image" src={productInfo.imageUrl} alt="Hình ảnh sản phẩm" />
        <div className="product-content">
          
          <p className="product-author">Tác giả: {productInfo.author}</p>
          <p className="product-name">Tên sản phẩm: {productInfo.name}</p>
          <p className="product-price">Giá: {productInfo.price} đơn vị tiền tệ</p>
        </div>
      </div>
      <div className="customer-info-container">
        <h2>Thông tin khách hàng</h2>

        <div className="input-container">
          <input
            type="text"
            name="fullName"
            value={customerInfo.fullName}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <label className="input-label">Họ và tên:</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <label className="input-label">Địa chỉ:</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="phoneNumber"
            value={customerInfo.phoneNumber}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <label className="input-label">Số điện thoại:</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="country"
            value={customerInfo.country}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <label className="input-label">Quốc gia:</label>
        </div>

        <button type="submit" className="save-button" onClick={handleSaveButtonClick}>
          THANH TOÁN
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
