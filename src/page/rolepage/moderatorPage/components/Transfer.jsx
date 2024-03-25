import React, { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';
import api from '../../../../components/utils/requestAPI';
import'./Report.css';
import LayoutMorder from "../../../../components/layout/LayoutMorder";

function Transfer() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [userName, setUserName] = useState([]);
    const [userNameMap, setUserNameMap] = useState({});
    const { auth } = useAuth();
    const [user, setUser] = useState(null);
    const [artworkList, setArtworkList] = useState([]);
    const [approved, setApproved] = useState(false);
    const currentDate = new Date();
    const isoString = currentDate.toISOString();
    // const navigate = useNavigate();

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
  useEffect(() => {
    const fetchUserNameData = async () => {
      try {
        const userIds = orders.map((order) => order.userId);
        const uniqueUserIds = Array.from(new Set(userIds)); // Loại bỏ các userId trùng lặp
        const promises = uniqueUserIds.map((userId) => api.post('https://localhost:7227/api/User/get-by-id', { userId }));
        const responses = await Promise.all(promises);
        const userNameMap = {};
        responses.forEach((response, index) => {
          userNameMap[uniqueUserIds[index]] = response.data.username; // Lưu tên người dùng vào userNameMap dựa trên userId
        });
        setUserNameMap(userNameMap);
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };

    if (orders.length > 0) {
      fetchUserNameData();
    }
  }, [orders]);

  const handleConfirmOrder = async (orderId) => {
    try {
      const order = orders.find((item) => item.orderId === orderId);
      if (order) {
        const response = await api.post('https://localhost:7227/api/Order/create-new-order', {
          userId: auth.user.userId,
          artwokID: order.artworkID,
          createDate: isoString ,
        });
        console.log(response.data);
        console.log('Order has been created successfully.');
        // navigate('/payment', { state: { ownerName: userNameMap[artworkList[order.artworkId].userId], amount: order.total } });
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  return (
    <LayoutMorder>
    <div className="history-page">
      <h1>Receiving Money History</h1>
      <div className="product-infos1">
                            <div className='AtworkS'><div className="Atwork">Artwork</div></div>
                            <div className="Actor">Artist</div> 
                            <div  className="NameAtwork">Buyer</div>   
                            
                            <div className="TimeApprove">Time Transfer</div>
                            <div className="TimeApprove">Total</div>
                            <div className="StatusApprove">Status</div>
                            <div className="StatusApprove">Action</div>
                        </div>
      <div className="history-list">
        {orders.map((item) => (
            artworkList[item.artworkId] && 
            // userNameMap[item.userId] &&
          <div key={item.$id} className="boxR">
            <img src={artworkList[item.artworkId].imageUrl} alt="Product" />
                        <div className="product-info">
                        {/* <div className="name">{item.orderId}</div> */}
                            <div className="name">{artworkList[item.artworkId].userId}  </div>
                            {/* <div className="name">{userNameMap[item.(artworkList[item.artworkId].userId)]}  </div> */}
                            <div  className="titleR">{item.userId}</div>   
                            <div className="time">{item.createDate}</div> 
                            <div className="status">{item.total}</div>
                            <div className="status">{item.status ? "Thành công" : "Đang chờ"}</div>
                            <button><div className="StatusApprove">Confirm</div></button>
                        </div>
            {/* <div className="history-info">
              <div className="history-detail">
            <div className="history-nameArtwork">Artwork: {item.description}</div>
            <div className="history-status">Status: {item.statusProcessing}</div>
            <div className="history-time">Time: {item.timeProcessing}</div>
            </div>
              <img src={item.imageUrl} alt="Product" /> 
            </div> */}
            {/* <div className="history-action">
              <button>View Details</button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
    </LayoutMorder>
  );
}

export default Transfer;
