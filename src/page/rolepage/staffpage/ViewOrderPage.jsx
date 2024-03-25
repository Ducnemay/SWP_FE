import React, { useState } from "react";
import "./OrderPage.css"

const ViewOrderPage = () => {

    return (
        <div className="order-page">
            {/* <div className="order-customer-info-section"> */}
            {/* <p>Tên khách hàng: John Doe</p> */}
            {/* <p>Số điện thoại: (555) 123-4567</p> */}
            {/* <p>Địa chỉ: 123 Main St</p> */}
            {/* </div> */}

            <div className="order-product-info-section">
                <p>Sản phẩm 1</p>
                <p>Sản phẩm 2</p>
            </div>

            <div className="summary-section">
                <p className="summary-title">Voucher: <span className="summary-detail">Voucher 1 (Giảm 10% giá trị sản phẩm)</span></p>
                <p className="summary-title">Phương thức thanh toán: <span className="summary-detail">Tiền mặt</span></p>
                <p className="summary-title">Tổng tiền hàng: <span className="summary-detail">$0</span></p>
            </div>

            <div className="finish-order">
                <button type="submit" className="finish-button">Hoàn thành</button>
            </div>
        </div>
    );
}

export default ViewOrderPage;