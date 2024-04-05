// Import useState vào từ React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CustomerConfirm.css';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../components/utils/requestAPI";

const CustomerConfirm = () => {
  const { artworkCustomeId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [usersData, setUsersData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch order data
        const orderResponse = await api.get(`https://localhost:7227/api/OrderRequire/Get-Order-Require-By-ArtCustomeId?ArtCustomeId=${artworkCustomeId}`);
        const extractedArtworks = orderResponse.data.$values || [];
        setOrderData(extractedArtworks);
        
        // Fetch user data for each user associated with the orders
        const userIds = extractedArtworks.map(order => order.userId);
        fetchUsers(userIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [artworkCustomeId]);

  const fetchUsers = async (userIds) => {
    try {
      const promises = userIds.map(userId =>
        api.post("https://localhost:7227/api/User/get-by-id", { userId })
      );
      const responses = await Promise.all(promises);
      const userDataMap = {};
      responses.forEach((response, index) => {
        const userData = response.data;
        const userId = userIds[index];
        userDataMap[userId] = userData;
      });
      setUsersData(userDataMap);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const handleReject = async (order) => {
    try {
      const response = await api.delete(`https://localhost:7227/api/OrderRequire/Delete-by-OrderRequireID?OrderRequireId=${order.orderRequireId}`);
      alert('delete Order art successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="customer-confirm">
      <Link to="/creator-confirm"><ol><i className="fa-solid fa-backward"></i> Back</ol></Link>
      <h2>INFORMATION</h2>
      {orderData.map((order) => (
        <div key={order.orderRequireId} className="order-info">
          <p><strong>Author:</strong> {usersData[order.userId]?.username}</p>
          {usersData[order.userId]?.imageUrl && <img src={usersData[order.userId].imageUrl} alt="User Avatar" />}
          <p><strong>Description:</strong> {order.description}</p>
          {/* Thêm các nút button */}
          <button onClick={() => handleAccept(order)}>Accept</button>
          <button onClick={() => handleReject(order)}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default CustomerConfirm;