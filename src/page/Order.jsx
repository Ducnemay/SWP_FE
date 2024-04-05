import React, { useEffect, useState } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../components/utils/requestAPI';
import './Order.css';
import Na from './Napage';
import {AiOutlineCloseCircle} from 'react-icons/ai';


export default function Order() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const { auth } = useAuth();
  const [artworks, setArtwork] = useState([]);
  const [artworkList, setArtworkList] = useState([]);
  const [approved, setApproved] = useState(false);
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrderData = async () => {
//       try {
//         const response = await api.get(`https://localhost:7227/api/Order/get-by-id?id=${orderId}`);
//         const orderData = response.data;
//         setOrder(orderData);
//       } catch (error) {
//         console.error('Error fetching order data:', error);
//       }
//     };

//     if (orderId) {
//       fetchOrderData();
//     }
//   }, [orderId]);

//   useEffect(() => {
//     const fetchArtworkData = async () => {
//       try {
//         if (order && order.artworkId) {
//           const response = await api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${order.artworkId}`);
//           const artworkData = response.data;
//           setArtworkList([artworkData]);
//         }
//       } catch (error) {
//         console.error('Error fetching artwork data:', error);
//       }
//     };

//     if (order && order.artworkId) {
//       fetchArtworkData();
//     }
//   }, [order]);

//   const createPayment = async () => {
//   try {
//     const paymentData = {
//       orderId: orderId
//     };
//     const response = await api.post(`https://localhost:7227/api/Payment/create-new-payment?id=${orderId}`, paymentData);
//     const paymentaway = response.data.paymentId; // Return the paymentId from the response
//     setApproved(true);
//       navigate(`/order-info/${orderId}`);
//   } catch (error) {
//     console.error('Error creating payment:', error);
//   }
// };


// const fetchUserNames = async (userIds) => {
//   try {
//     const promises = userIds.map(userId => api.post('https://localhost:7227/api/User/get-by-id', { userId }));
//     const responses = await Promise.all(promises);
//     const userNames = responses.map(response => response.data.username);
//     return userNames;
//   } catch (error) {
//     console.error('Error fetching user names:', error);
//     return [];
//   }
// }; 

//  // Lấy userId từ artworkId để truyền vào fetchUserNames
// useEffect(() => {
// const fetchArtworkDatas = async () => {
//   try {
//     const artworkPromises = artworkList.map(ord => api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${ord.artworkId}`));
//     const artworks = await Promise.all(artworkPromises);
//     const userIds = artworks.map(artwork => artwork.data.userId);
    
//     // Lấy tên người dùng từ userIds
//     const userNames = await fetchUserNames(userIds);
    
//     const artworkLists = artworks.reduce((acc, artwork, index) => {
//       const userId = artwork.data.userId;
//       const userName = userNames[index]; // Lấy tên người dùng tương ứng với userId
//       acc[artworkList[index].artworkId] = {
//         ...artwork.data,
//         userName: userName // Thêm thông tin tên người dùng vào đối tượng artwork
//       };
//       return acc;
//     }, {});

//     setArtwork(artworkLists);
//   } catch (error) {
//     console.error('Error fetching artwork data:', error);
//   }
//     };
//     if (artworkList.length > 0) {
//       fetchArtworkDatas();
//     }
//     }, [artworkList]);

  return (
    // <div>
    //   <Na className="Navuser" />
    //   <div className="order-container">
       
    //     <div className="order-row">
    //       <div className="atwork-order-mau1">
    //         <div className="order-authors-mau">Actor</div>
    //         <div className="order-titles-mau">Name of Atwork</div>
    //         <div className="order-totals-mau">Total</div>
    //         <div className="order-atwork-mau">Atwork</div>
    //         {/* <div className="order-action-mau">Action</div> */}
    //       </div>

    //       <div className="order-box">
    //         {artworkList.map((artwork) => (
    //            artworks[artwork.artworkId] &&
    //           <div key={artwork.id} className="image-collection">
    //             <div className="order-details">
    //               <div className="order-authors">{artworks[artwork.artworkId].userName}</div>
    //               <div className="order-titles">{artwork.title}</div>
    //               <div className="order-totals">{order.total}</div>
    //               <div className="order-overlay">
    //               <img src={artwork.imageUrl} alt="Artwork" />
    //             </div>

    //             </div>
    //             <button onClick={createPayment} className="order-confirm-button">
    //                 PAY
    //               </button>
    //             <div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="payment-blog-page">
        <AiOutlineCloseCircle style={{ color: 'red',fontSize: '100px',marginBottom: '20px',marginTop: '40px' }} />;
      <h1>Payment Unsuccessful</h1>
      {/* <h3 style={{ marginBottom: '20px' }}>You can see details in <a href='/transHis' style={{ textDecoration: 'none' }}>your TransactionHistory</a></h3>
      <h4>Payment will be processed by Artist,Moderator</h4> */}
      <Link to="/insight"><button className="payment-blog-button-cancle">Back to home</button></Link>
    </div>
  );
}