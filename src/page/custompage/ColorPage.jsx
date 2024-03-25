import React from "react";
import './CustomPage.css';
import { Link } from "react-router-dom";

const SizePage = () => {
  const handleButtonClick = () => {
    window.location.href = "/custom-products-end";
  };

  return (
    <div className="custom-page">
      <h2 className="custom-title">Thiết Kế Lồng</h2>
      <div className="custom-option">
        <ul>
          <li>
            <Link to="/custom-products-shape"> Hình Dáng  </Link>
          </li>
          <li>
            <Link to="/custom-products-size"> Kích Thước </Link>
          </li>
          <li>
            <Link to="/custom-products-color">Màu Sắc  </Link>
          </li>
          <li>
            <Link to="/custom-products-material"> Chất Liệu  </Link>
          </li>
          <li>
            <Link to="/custom-products-end">Tổng Thể </Link>
          </li>
        </ul>
      </div>

      <div className="custom-option-detail">
        <h2 className="custom-option-detail-title">Chọn Màu Sắc Lồng Của Bạn </h2>
        <div className="custom-choose-and-detail">
          <div className="custom-option-detail-list">
            <div className="custom-detail-item">
              <h3> Màu Đen </h3>
              <img src="public\Longhinhtru.jpg" alt="Chim" className="custom-product-image" />
              <button onClick={handleButtonClick} className="choose-button">Chọn</button>
            </div>
            <div className="custom-detail-item">
              <h3> Màu Gỗ </h3>
              <img src="public\Longhinhtru.jpg" alt="Chim" className="custom-product-image" />
              <button onClick={handleButtonClick} className="choose-button">Chọn</button>
            </div>
            <div className="custom-detail-item">
              <h3> Màu Trắng </h3>
              <img src="public\Longhinhtru.jpg" alt="Chim" className="custom-product-image" />
              <button onClick={handleButtonClick} className="choose-button">Chọn</button>
            </div>
          </div>

          <div className="custom-summary">
            <div className="custom-summary-detail">
              <h2>Thông tin lồng</h2>
              <p>Hình dáng: <span>Hình vuông</span></p>
              <p>Kích thước: <span>100x50"</span></p>
              <p>Vật liệu: <span>Vàng</span></p>
              <p>Màu sắc: <span>Đỏ</span></p>

              <h4>Giá Hiện Tại: 5000$</h4>
            </div>

            <div className="custom-summary-reset">
              <button type="submit">Thiết Lập Lại Đơn Hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SizePage;