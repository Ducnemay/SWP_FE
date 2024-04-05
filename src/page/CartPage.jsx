import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { FaTrashAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import api from "../components/utils/requestAPI";
import {useNavigate } from 'react-router-dom';

// Định nghĩa hàm formatCash để định dạng số tiền thành chuỗi tiền tệ
const formatCash = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CartPage = () => {
  const { auth } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [userMap, setUserMap] = useState({});
  const totalPayment = products.reduce((total, product) => total + product.price, 0);
  const [approved, setApproved] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (auth.user) {
          const orderResponse = await api.get(`https://localhost:7227/api/Order/get-order-false-by-userid?UserId=${auth.user.userId}`);
          const extractedArtworks = orderResponse.data.$values || [];
          setCartItems(Array.isArray(extractedArtworks) ? extractedArtworks : []);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [auth.user]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productIds = cartItems.map((item) => item.artworkId);
        const productsResponse = await Promise.all(
          productIds.map((productId) => api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${productId}`))
        );
        const productsData = productsResponse.map((response) => response.data);
        setProducts(productsData);

        // Lấy userId của tất cả các sản phẩm
        const userIds = productsData.map((product) => product.userId);
        
        // Gọi hàm fetchUsers để lấy thông tin người dùng dựa trên userIds
        fetchUsers(userIds);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const fetchUsers = async (userIds) => {
    try {
      const promises = userIds.map(userId =>
        api.post("https://localhost:7227/api/User/get-by-id", { userId })
      );
      const responses = await Promise.all(promises);
      const userMap = {};
      responses.forEach((response, index) => {
        const userData = response.data;
        const userId = userIds[index];
        userMap[userId] = userData;
      });
      setUserMap(userMap);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const removeFromCart = async (orderId) => {
    try {
      const updatedCart = cartItems.filter((item) => item.orderId !== orderId);
      setCartItems(updatedCart);
      await api.delete(`https://localhost:7227/api/Order/delete-order-success?id=${orderId}`);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  const createPayment = async (orderId) => {
    try {
      const paymentData = {
        orderId: orderId
      };
      const response = await api.post(`https://localhost:7227/api/Payment/create-new-payment?id=${orderId}`, paymentData);
      const paymentaway = response.data.paymentId; // Return the paymentId from the response
      setApproved(true);
      // 
      try{
      const responseVNpay = await api.get(`https://localhost:7227/api/VNPay?PaymentID=${paymentaway}`);
      // setPaymentUrl(responseVNpay.data);
      // await setPaymentUrl(responseVNpay.data);
     
      window.location.href = responseVNpay.data;
    
      // window.open(paymentUrl);
        // navigate(`/order-info/${paymentUrl}`);
    } catch (error) {
      console.error('Error creating payment1:', error);
    }
  } catch (error) {
    console.error('Error creating payment2:', error);
}
  }
  // navigate(`/order-info/${orderId}`);
  
  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Order</h2>
      <div className="cart-product-infos1">
      <div className="cart-Atwork">Artwork</div>
                            
                            <div className="cart-TimeApprove">Unit price</div>
                            <div className="cart-TimeApprove">Quantity</div>
                            <div className="cart-Total">Total</div>
                            <div className="cart-StatusApprove">Action</div>
                            
                        </div>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Không có sản phẩm nào trong giỏ hàng của bạn.</p>
      ) : (
        <div className="cart-items">
          {products.map((product) => (
            <div key={product.productId} className="cart-item">
              <div className="cart-product-info">
                {/* <img src={product.imageUrl} alt={product.title} className="cart-product-image" /> */}
                <div className="cart-details">
                <div className="cart-img-titl">
                <img src={product.imageUrl} alt={product.title} className="cart-product-image" />
                <h3 className="cart-product-title">{product.title}</h3></div>
                <p className="cart-product-price">₫{formatCash(product.price)}</p>
                <p className="cart-product-quantity">1</p>
                  <p className="cart-product-author">₫{formatCash(product.price)}</p>
                  {/* <h3 className="cart-product-title">{product.title}</h3> */}
                  <div className="button-payment-cart">
                  <button onClick={() => removeFromCart(cartItems.find(item => item.artworkId === product.artworkId).orderId)} className="remove-button">
                <FaTrashAlt />
              </button>
              <button onClick={() => createPayment(cartItems.find(item => item.artworkId === product.artworkId).orderId)}className="cart-blog-button-cancle">PAY</button>
                </div>
                </div>
              </div> 
            </div>
            
          ))}
        </div>
      )}
     
    </div>
    
  );
};

export default CartPage;