import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../components/utils/requestAPI';
import "./Order.css";
import Na from "./Napage";
import "./Insight.css";
import {useNavigate } from 'react-router-dom';

export default function Insight() {
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState('');
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);
  const [confirmations, setConfirmations] = useState({});
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const [artworkList, setArtworkList] = useState([]);
  const [approved, setApproved] = useState(false);
  const [status, setStatus] = useState([]);


  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.user) {
          const response = await api.post("https://localhost:7227/api/User/get-by-id", { userId: auth.user.userId });
          setUser(response.data);
          const responseArtworks = await api.get("https://localhost:7227/api/Order/get-all");
          const allOrders = responseArtworks.data.$values;
          const userOrders = allOrders.filter(order => order.userId === auth.user.userId);

          setOrders(userOrders);
          setLoading(false);
          console.log(userOrders);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [auth]);
  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        const artworkPromises = orders.map(ord => api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${ord.artworkId}`));
        const artworks = await Promise.all(artworkPromises);
        const artworkList = artworks.reduce((acc, artwork, index) => {
          acc[orders[index].artworkId] = artwork.data;
          return acc;
        }, {});
        setArtworkList(artworkList);
      } catch (error) {
        console.error('Error fetching artwork data:', error);
      }
    };

    if (orders.length > 0) {
      fetchArtworkData();
    }
  }, [orders]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const artworkPromises = orders.map(ord => api.get(`https://localhost:7227/api/Payment/get-payment-by-order-id?id=${ord.orderId}`));
        const artworks = await Promise.all(artworkPromises);
        const artworkList = artworks.reduce((acc, artwork, index) => {
          acc[orders[index].orderId] = artwork.data;
          return acc;
        }, {});
        setStatus(artworkList);
      } catch (error) {
        console.error('Error fetching artwork data:', error);
      }
    };

    if (orders.length > 0) {
      fetchPaymentData();
    }
  }, [orders]);

  

  const handleShippingMethodChange = (method) => {
    setShippingMethod(method);
    setShowShippingInfo(method === 'Shipping');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // sau khi submit form
  };
  
  useEffect(() => {
    if (auth.user) {
      // Nếu auth.user đã được thiết lập, thực hiện các thao tác tiếp theo
      const storedNotification = localStorage.getItem(`notification_${auth.user.userId}`);
      if (storedNotification) {
        alert(storedNotification);
        localStorage.removeItem(`notification_${auth.user.userId}`);
      }
    }
  }, [auth.user]);

  const Refund = async (orderId) => {
    try {
        const response = await api.get(`https://localhost:7227/api/Payment/get-payment-by-order-id?id=${orderId}`);
        const paymentaway = response.data.paymentId; // Return the paymentId from the response
        const response1 = await api.post(`https://localhost:7227/api/Payment/delete-payment?id=${paymentaway}`);
        setConfirmations(prevState => ({
          ...prevState,
          [orderId]: false
        }));
    } catch (error) {
        console.error('Error refund payment:', error);
    }
};
const handleConfirmRefund = (orderId) => {
  // Hiển thị thông báo xác nhận cho orderId
  setConfirmations(prevState => ({
    ...prevState,
    [orderId]: true
  }));
};

const handleCancel = (orderId) => {
  // Tắt thông báo xác nhận cho orderId
  setConfirmations(prevState => ({
    ...prevState,
    [orderId]: false
  }));
};


  return (
    <div>
      <Na className="Navuser" /> 
    
   
      
      
          
          <div className="insight-order-box">
            {orders.map((ord) => (
              ord.statusCancel &&
              artworkList[ord.artworkId] && status[ord.orderId] &&
              <div key={ord.$id} className="insight-image-collection">
                
                <div className="insight-order-overlay">  
   <img src={artworkList[ord.artworkId].imageUrl2} alt="insight-Artwork" 
   className={ord.statusProccessing ? '' : 'processing-false'}
   />
   {!ord.statusProccessing && ord.statusCancel && status[ord.orderId].statusCancle && <div className="waiting-text">Wating...</div>}
   {!status[ord.orderId].statusCancle &&  <div className="waiting-text">Refunding..</div>}
   
                </div>
                <div className="insight-order-details">
                  <div className="insight-order-authors">{artworkList[ord.artworkId].description}</div>
                  <div className="insight-order-titles">{artworkList[ord.artworkId].title}</div>
                  {status[ord.orderId].statusCancle && !ord.statusProccessing && <div >   
                 <button className="refund-button" onClick={() => handleConfirmRefund(ord.orderId)}>Refund Artwork</button>
                 {confirmations[ord.orderId] && (
         <div className="refund-overlay">
         <div className="refund-confirmation">
           <p  style={{ color: 'black',fontSize: '20px',marginBottom: '20px',marginTop: '40px' }}>Are you sure you want to cancel this artwork?</p>
           <p>If you refund the artwork, the money will be transferred to you after confirmation by Artist, Moder</p>
           <button className="refund-button1" onClick={() => Refund(ord.orderId)}>Yes</button>
                <button className="refund-button2" onClick={() => handleCancel(ord.orderId)}>No</button>
         </div>
       </div>
     )}
                </div>}
                
                </div>
              </div>
            ))}
          </div>
          
        
      
   </div>
  );
}