import React, { useState } from 'react';
import './CreatorConfirm.css'; // Import CSS file
import api from "../components/utils/requestAPI";
import useAuth from "../hooks/useAuth";

function ConfirmationPage() {
  const [des, setDes] = useState('');
  const [price, setPrice] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleNameChange = (event) => {
    setDes(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleConfirm = () => {
    // Xử lý xác nhận ở đây, ví dụ: gửi dữ liệu thông qua API hoặc lưu vào cơ sở dữ liệu
    setConfirmed(true);
  };

  const handleReject = () => {
    // Xử lý từ chối ở đây
    // Ví dụ: Quay về trang trước
    // Hoặc hiển thị thông báo rằng thông tin đã bị từ chối
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  if (confirmed) {
    return (
      <div className="container">
        <h2>Confirm and Response Require</h2>
        <p>Descbrice: {des}</p>
        <p>Price: {price}</p>
        <button>Send</button>
        <div><>* From Creator send to Customer Require!</></div>
      </div>

    );

  }

  return (
    <div className="creator-confirm-container">
      <h2>ORDER REQUIRE</h2>
      <div>
        <h3>Danh sách đơn hàng</h3>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Artwork Products</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.Stt} onClick={() => handleOrderSelect(order)}>
                <td>{order.Stt}</td>
                <td>{order.productName}</td>
                <td><button>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <div>
          <h3>Details Order Require</h3>
          <p>STT: {selectedOrder.Stt}</p>
          <p>Artwork Products: {selectedOrder.productName}</p>
          {/* <p>Action: {selectedOrder.quantity}</p> */}
          <button type="button" className="creator-confirm-button" onClick={handleConfirm}>Đồng ý</button>
          <button type="button" className="creater-reject-button" onClick={handleReject}>Từ chối</button>
        </div>
      )}
      {/* <div>
        <h3>Thông tin người mua</h3>
        <form>
          <label>
            Tên:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Price:
            <input type="Price" value={Price} onChange={handlePriceChange} />
          </label>
          <br />
        </form>
      </div> */}
    </div>
  );
}

export default ConfirmationPage;
