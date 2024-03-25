import React, { useState } from "react";
import "./OrderPage.css"

const AnnounceOrderPage = () => {

    return (
        <div className="order-page">
            <div className="order-customer-info-section">
                <p>Tên khách hàng: John Doe</p>
                <p>Số điện thoại: (555) 123-4567</p>
                <p>Địa chỉ: 123 Main St</p>
            </div>

            <div className="order-product-info-section">
                <p>Sản phẩm 1</p>
            </div>

            <div className="process-section">
                <label htmlFor="dob" className='process-section-label'>Ngày hoàn thành dự tính</label>
                <input type="date" name="dob" className='process-section-date' required />
            </div>

            <div className="finish-order">
                <button type="submit" className="finish-button">Gửi thông báo</button>
            </div>
        </div>
    );
}

export default AnnounceOrderPage;