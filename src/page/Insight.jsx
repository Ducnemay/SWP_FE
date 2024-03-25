import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../components/utils/requestAPI';
import "./Order.css";
import Na from "./Napage";
import "./Insight.css";

export default function Insight() {
  const [shippingMethod, setShippingMethod] = useState('');
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const [artworkList, setArtworkList] = useState([]);

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



  return (
    <div>
      <Na className="Navuser" /> 
    
   
      
      
          
          <div className="insight-order-box">
            {orders.map((ord) => (
              artworkList[ord.artworkId] && ord.status &&  
              <div key={ord.$id} className="insight-image-collection">
                
                <div className="insight-order-overlay">  
   <img src={artworkList[ord.artworkId].imageUrl} alt="insight-Artwork" />
                </div>
                <div className="insight-order-details">
                  <div className="insight-order-authors">{artworkList[ord.artworkId].description}</div>
                  <div className="insight-order-titles">{artworkList[ord.artworkId].title}</div>
                   
                  
                </div>
                
              </div>
            ))}
          </div>
          
        
      
   </div>
  );
}