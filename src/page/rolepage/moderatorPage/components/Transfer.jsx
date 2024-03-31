import React, { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';
import api from '../../../../components/utils/requestAPI';
import'./Transfer.css';
import LayoutMorder from "../../../../components/layout/LayoutMorder";
import { useNavigate } from 'react-router-dom';

function Transfer() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [premium, setPremium] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [userName, setUserName] = useState([]);
    const [userNameMap, setUserNameMap] = useState({});
    const { auth } = useAuth();
    const [user, setUser] = useState(null);
    const [artworkList, setArtworkList] = useState([]);
    const [approved, setApproved] = useState(false);
    const currentDate = new Date();
    const isoString = currentDate.toISOString();
    const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.user) {
          const response = await api.post("https://localhost:7227/api/User/get-by-id", { userId: auth.user.userId });
          setUser(response.data);

          

          // Lấy danh sách orderId từ kết quả của API get-payment-by-order-id
        const paymentResponse = await api.get("https://localhost:7227/api/Payment/get-payments");
        const orderIdsInPayment = paymentResponse.data.$values.map(payment => payment.orderId);

          // Lấy danh sách tất cả các đơn hàng
          const responseArtworks = await api.get("https://localhost:7227/api/Order/get-all");
          const allOrders = responseArtworks.data.$values;
           
        // Lọc chỉ giữ lại các đơn hàng mà orderId được tìm thấy trong danh sách orderId từ payment
        const filteredOrders = allOrders.filter(order => orderIdsInPayment.includes(order.orderId));
        filteredOrders.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

        const Premiumresponse = await api.get("https://localhost:7227/api/OrderPremium/get-all");
        Premiumresponse.data.$values.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

          setPremium(Premiumresponse.data.$values)
          setOrders(filteredOrders);
          console.log(filteredOrders);
          // setArtworkList(artworkData)
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [auth]);
  const fetchUserNames = async (userIds) => {
    try {
      const promises = userIds.map(userId => api.post('https://localhost:7227/api/User/get-by-id', { userId }));
      const responses = await Promise.all(promises);
      const userNames = responses.map(response => response.data.username);
      return userNames;
    } catch (error) {
      console.error('Error fetching user names:', error);
      return [];
    }
  }; 

   // Lấy userId từ artworkId để truyền vào fetchUserNames
  useEffect(() => {
  const fetchArtworkData = async () => {
    try {
      const artworkPromises = orders.map(ord => api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${ord.artworkId}`));
      const artworks = await Promise.all(artworkPromises);
      const userIds = artworks.map(artwork => artwork.data.userId);
      
      // Lấy tên người dùng từ userIds
      const userNames = await fetchUserNames(userIds);
      
      const artworkList = artworks.reduce((acc, artwork, index) => {
        const userId = artwork.data.userId;
        const userName = userNames[index]; // Lấy tên người dùng tương ứng với userId
        acc[orders[index].artworkId] = {
          ...artwork.data,
          userName: userName // Thêm thông tin tên người dùng vào đối tượng artwork
        };
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

      // Lấy userId từ orderId để truyền vào fetchUserNames
      useEffect(() => {
        const fetchOrderData = async () => {
          try {
            const orderPromises = orders.map(order => api.get(`https://localhost:7227/api/Order/get-by-id?id=${order.orderId}`));
            const orderResponses = await Promise.all(orderPromises);
            const userIds = orderResponses.map(order => order.data.userId);
      
            // Lấy tên người dùng từ userIds
            const userNames = await fetchUserNames(userIds);
            
            const orderList = orderResponses.reduce((acc, order, index) => {
              const userId = order.data.userId;
              const userName = userNames[index]; // Lấy tên người dùng tương ứng với userId
              acc[orders[index].orderId] = {
                ...order.data,
                userName: userName // Thêm thông tin tên người dùng vào đối tượng artwork
              };
              return acc;
            }, {});
      
            setOrderList(orderList);
          } catch (error) {
            console.error('Error fetching order data:', error);
          }
        };
      
        if (orders.length > 0) {
          fetchOrderData();
        }
      }, [orders]);

      useEffect(() => {
      const fetchUserData = async () => {
        try {
          const artworkPromises = premium.map(item => api.post('https://localhost:7227/api/User/get-by-id', { userID : item.userId }));
          const artworks = await Promise.all(artworkPromises);
          const artworkList = artworks.reduce((acc, artwork, index) => {
            acc[premium[index].userId] = artwork.data;
            return acc;
          }, {});
      
          setUserName(artworkList);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
          };
        if (premium.length > 0) {
          fetchUserData();
            }
          }, [premium]);
  
  

  const handleConfirmOrder = async (userId,artworkUserId, orderId) => {
    try {
        navigate(`/paymentbank/${userId}/${artworkUserId}/${orderId}`);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  return (
    <LayoutMorder>
    <div className='recieve-history-page-both'>
    <div className="recieve-history-page">
      <h1>Receiving Money History</h1>
      <div className="recieve-product-infos1">
                            <div className="recieve-Atwork">Artwork</div>
                            <div className="recieve-Actor">Artist</div> 
                            <div  className="recieve-NameAtwork">Buyer</div>   
                            
                            <div className="recieve-TimeApprove">Time Transfer</div>
                            <div className="recieve-TimeApprove">Total</div>
                            <div className="recieve-StatusApprove">Status</div>
                            <div className="recieve-StatusApprove">Action</div>
                        </div>
      <div className="recieve-history-list">
        {orders.map((item) => (
              artworkList[item.artworkId] && orderList[item.orderId] &&
            // userNameMap[item.userId] &&
          <div key={item.$id} className="recieve-boxR">
            <img src={artworkList[item.artworkId].imageUrl} alt="Product" />
                        <div className="recieve-product-info">
                        {/* <div className="name">{item.orderId}</div> */}
                            <div className="recieve-name">{artworkList[item.artworkId].userName}  </div>
                            {/* <div className="name">{userNameMap[item.(artworkList[item.artworkId].userId)]}  </div> */}
                            <div  className="recieve-titleR">{orderList[item.orderId].userName}</div>   
                            {/* <div  className="recieve-titleR">{item.userId}</div>    */}
                            <div className="recieve-time">{item.createDate}</div> 
                            <div className="recieve-status">+ ${item.total}</div>
                            <div className="recieve-status">{item.status ? "Success" : "Waiting"}</div>
                            {!item.status && ( 
                            <button onClick={() => handleConfirmOrder(auth.user.userId,artworkList[item.artworkId].userId,item.orderId)}><div className="recieve-StatusApprove">Confirm</div></button>
                            )}
                            </div>
          </div>
          
        ))}
      </div>
    </div>
    
    <div className="recieve-history-page">
      <h1>Receiving Premium History</h1>
      <div className="recieve-product-infos1" style={{display:"flex", gap:"450px"}}>
                            {/* <div className="recieve-Atwork">PremiumId</div> */}
                            {/* <div className="recieve-Actor">Artist</div>  */}
                            <div  className="recieve-NameAtwork">Buyer</div>   
                            
                            <div className="recieve-TimeApprove">Order Date</div>
                            <div className="recieve-TimeApprove">Total</div>
                            <div className="recieve-StatusApprove">Status</div>
                            {/* <div className="recieve-StatusApprove">Action</div> */}
                        </div>
      <div  className="recieve-history-list">
        {premium.map((item) => (
              userName[item.userId] && 
            // userNameMap[item.userId] &&
          <div key={item.$id} className="recieve-boxR">
            {/* <img src={artworkList[item.artworkId].imageUrl} alt="Product" /> */}
                        <div  className="recieve-product-info1">
                        {/* <div className="name">{item.orderId}</div> */}
                            <div className="recieve-name">{userName[item.userId].username}  </div>
                            {/* <div className="name">{userNameMap[item.(artworkList[item.artworkId].userId)]}  </div> */}
                            {/* <div  className="recieve-titleR">{orderList[item.orderId].userName}</div>    */}
                            {/* <div  className="recieve-titleR">{item.userId}</div>    */}
                            <div className="recieve-time">{item.orderDate}</div> 
                            <div className="recieve-status">+ ${item.total}</div>
                            <div className="recieve-status">{item.status ? "Success" : "Waiting"}</div>
                            </div>
          </div>
          
        ))}
      </div>
    </div>
    </div>
    </LayoutMorder>
  );
}

export default Transfer;
