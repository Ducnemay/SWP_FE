import React, { useState, useEffect } from 'react';
import './CreatorConfirm.css'; // Import CSS file
import api from "../components/utils/requestAPI";
import useAuth from "../hooks/useAuth";

const ConfirmationPage = () => {
  const { auth } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("https://localhost:7227/api/ArtCustome/get-all");
      const data = response.data.$values[0]; // Assuming you only need one order
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };
  const handleConfirm = async () => {
    // You can implement your confirm logic here
    // For example, you can make an API call to confirm the order
    if (order) {
      try {
        // Example: You might send a POST request to confirm the order
        await api.post(`https://localhost:7227/api/Order/create-new-order-custome/${order.artworkCustomeId}`);
        alert("Order confirmed successfully!");
      } catch (error) {
        console.error('Error confirming order:', error);
        alert("Error confirming order. Please try again later.");
      }
    } else {
      alert("No order selected to confirm.");
    }
  };

  return (
    <div className="creator-confirm-container">
      <h2>ORDER REQUIRE</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>CustomeArtID</th>
              <th>Description</th>
              <th>Deadline Day</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order && (
              <tr key={order.artworkCustomeId}>
                <td>{order.artworkCustomeId}</td>
                <td>{order.description}</td>
                <td>{order.deadlineDate}</td>
                <td><img src={order.image} alt="" /></td>
                <td>{order.price}</td>
                <td><button onClick={() => handleConfirm(order.artworkCustomeId)}>Confirm Order</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConfirmationPage;
