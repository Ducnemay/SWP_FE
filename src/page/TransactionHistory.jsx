import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Na from "./Napage";
import api from "../components/utils/requestAPI"; 
import useAuth from "../hooks/useAuth";
import './TransactionHistory.css'; 

const TransactionHistory = () => {
  const { auth } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (auth.user) {
      const fetchTransactions = async () => {
        try {
          const response = await api.get(`https://localhost:7227/api/Order/get-all-by-user?id=${auth.user.userId}`);
          setTransactions(response.data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };
      fetchTransactions();
    }
  }, [auth.user]);

  return (
    <div>
      <Na className="Navuser" />
      <div className="transaction-history">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Product Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.orderId}>
                <td>{transaction.orderId}</td>
                <td>{transaction.date}</td>
                <td>
                  {transaction.products.map(product => (
                    <div key={product.productId}>
                      <Link to={`/product/${product.productId}`}>
                        <p className="product-name">{product.title}</p>
                      </Link>
                      <p className="product-price">{product.price}</p>
                    </div>
                  ))}
                </td>
                <td>
                  <FaHeart className="heart-icon" onClick={() => handleUnLove(productId, auth.user.userId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
