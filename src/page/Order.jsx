import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../components/utils/requestAPI';
import './Order.css';
import Na from './Napage';

export default function Order() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const { auth } = useAuth();
  const [artworkList, setArtworkList] = useState([]);
  const [approved, setApproved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await api.get(`https://localhost:7227/api/Order/get-by-id?id=${orderId}`);
        const orderData = response.data;
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    if (orderId) {
      fetchOrderData();
    }
  }, [orderId]);

  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        if (order && order.artworkId) {
          const response = await api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${order.artworkId}`);
          const artworkData = response.data;
          setArtworkList([artworkData]);
        }
      } catch (error) {
        console.error('Error fetching artwork data:', error);
      }
    };

    if (order && order.artworkId) {
      fetchArtworkData();
    }
  }, [order]);

  const createPayment = async () => {
  try {
    const paymentData = {
      orderId: orderId
    };
    const response = await api.post(`https://localhost:7227/api/Payment/create-new-payment?id=${orderId}`, paymentData);
    const paymentaway = response.data.paymentId; // Return the paymentId from the response
    setApproved(true);
      navigate(`/order-info/${orderId}`);
  } catch (error) {
    console.error('Error creating payment:', error);
  }
};

// const updateOrder = async (paymentId) => {
//   try {
//     if (auth.user) {
//       const orderData = {
//         paymentId: paymentId
//       };
//       const response = await api.post(`https://localhost:7227/api/Order/update-order?order=${paymentId}`, orderData);
//       console.log(response.data);
//       console.log('Order has been updated');
//       setApproved(true);
//       navigate(`/order-info/${orderId}`);
//     }
//   } catch (error) {
//     console.error('Error updating order:', error);
//   }
// };


//   const handleUpdateStatusOrder = async () => {
//     try {
//       if (order && auth.user) {
//         const paymentId = await createPayment(); // Tạo mới Payment và nhận paymentId
//         if (paymentId) {
//           await updateOrder(paymentId); // Cập nhật Order với paymentId
//         }
//       }
//     } catch (error) {
//       console.error('Error updating order:', error);
//     }
//   };

  return (
    <div>
      <Na className="Navuser" />

      <div className="order-container">
        <div className="order-row">
          <div className="atwork-order-mau1">
            <div className="order-atwork-mau">Atwork</div>
            <div className="order-authors-mau">Actor</div>
            <div className="order-titles-mau">Name of Atwork</div>
            <div className="order-totals-mau">Total</div>
            <div className="order-action-mau">Action</div>
          </div>

          <div className="order-box">
            {artworkList.map((artwork) => (
              <div key={artwork.id} className="image-collection">
                <div className="order-overlay">
                  <img src={artwork.imageUrl} alt="Artwork" />
                </div>
                <div className="order-details">
                  <div className="order-authors">{artwork.description}</div>
                  <div className="order-titles">{artwork.title}</div>
                  <div className="order-totals">{order.total}</div>
                </div>
                <div>
                  <button onClick={createPayment} className="order-confirm-button">
                    PAY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}