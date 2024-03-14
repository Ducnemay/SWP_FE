import React, { useState, useEffect } from 'react';
import Na from "./Napage";
import api from "../components/utils/requestAPI"; 
import useAuth from "../hooks/useAuth";
import "./TransactionHistory.css"
 const TransactionHistory = () => {
  const { auth } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.user) {
          const response = await api.post("https://localhost:7227/api/User/get-by-id", { userId: auth.user.userId });
          const userOrdersResponse = await api.get("https://localhost:7227/api/Order/get-all");
          const allOrders = userOrdersResponse.data.$values;

          const transactionsData = [];

          for (const order of allOrders) {
            try {
              const paymentResponse = await api.get(`https://localhost:7227/api/Payment/get-payment-by-order-id?id=${order.orderId}`);
              const paymentData = paymentResponse.data;
              console.log('Payment Data:', paymentData); // Add this line for debugging
              transactionsData.push(paymentData);
            } catch (paymentError) {
              console.error(`Error fetching payment data for order ${order.orderId}:`, paymentError);
              // Handle the error (e.g., log it, display a message to the user)
            }
          }

          setTransactions(transactionsData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error (e.g., log it, display a message to the user)
      }
    };

    fetchUserData();
  }, [auth]);

  return (
    <div>
      <Na className="Navuser" />
      <div className="transaction-history">
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.paymentId}>
                <td>{transaction.paymentId}</td>
                <td>{transaction.orderId}</td>
                <td>{new Date(transaction.createDate).toLocaleString()}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.status ? 'Success' : 'Waiting'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TransactionHistory;