import React, { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';
import api from '../../../../components/utils/requestAPI';
import'./Send.css';
import LayoutMorder from "../../../../components/layout/LayoutMorder";
import { useNavigate } from 'react-router-dom';

function Refund() {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [orders, setOrders] = useState([]);
    const [userOrder, setUserOrder] = useState([]);
    const [payment, setPayment] = useState([]);
    const { auth } = useAuth();
    const [user, setUser] = useState(null);
    const [artworkList, setArtworkList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [approved, setApproved] = useState(false);
    const currentDate = new Date();
    const isoString = currentDate.toISOString();
    const navigate = useNavigate();
    let orderUpdated = false;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API để lấy thông tin payment
                const paymentResponse = await api.get(`https://localhost:7227/api/Payment/get-payments`);
                // const paymentData = paymentResponse.data.$values;
                const paymentData = paymentResponse.data

                // Lấy thông tin orderId thông qua paymentId
                const order_Id = paymentData.orderId

                //Lấy thông tin artworkId thông qua orderId
                
                // Cập nhật state với thông tin sản phẩm và người dùng
                setPayment(paymentData.$values);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };

        fetchData();
    }, []);

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
  
  
            setOrders(filteredOrders);
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

        useEffect(() => {
        const fetchOrderData = async () => {
          try {
            const artworkPromises = payment.map(item => api.get(`https://localhost:7227/api/Order/get-by-id?id=${item.orderId}`));
            const artworks = await Promise.all(artworkPromises);
            const artworkList = artworks.reduce((acc, artwork, index) => {
              acc[payment[index].orderId] = artwork.data;
              return acc;
            }, {});
        
            setOrderList(artworkList);
          } catch (error) {
            console.error('Error fetching artwork data:', error);
          }
            };
          if (payment.length > 0) {
                fetchOrderData();
              }
            }, [payment]);

            useEffect(() => {
                const fetchOrderData2 = async () => {
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
              
                    setUserOrder(orderList);
                  } catch (error) {
                    console.error('Error fetching order data:', error);
                  }
                };
              
                if (orders.length > 0) {
                  fetchOrderData2();
                }
              }, [orders]);
    const handleRefund = async (ord) => {
                try {
                  // Gọi API để lấy thông tin đơn hàng dựa trên orderId
                  const orderResponse = await api.get(`https://localhost:7227/api/Order/get-by-id?id=${ord}`);
                  const orderData = orderResponse.data;
                // Lấy userId từ dữ liệu đơn hàng
                const userIdOrder = orderData.userId;

                // Gửi yêu cầu POST để lấy thông tin người dùng dựa trên userId
                const userResponse = await api.post(`https://localhost:7227/api/User/get-by-id`, { userID: userIdOrder });
                const userData = userResponse.data;
                    setUserInfo(userData);  
                  setProductInfo(orderData);
                  console.log(productInfo);

                    const OrderCancle = await api.post(`https://localhost:7227/api/Order/delete-order?id=${ord}`);
                  orderUpdated = true;
                  
                  if(orderUpdated){
                    // Thông tin truyền vào POST để cập nhật số tiền của moder
                    const data_userArtwok = {
                        money: user.money - productInfo.total,
                    };
            
                    // Gửi yêu cầu POST để cập nhật số tiền của moder
                    await api.post(`https://localhost:7227/api/User/update-money?id=${auth.user.userId}`, data_userArtwok);
                    
                    // Thông tin truyền vào POST để cập nhật số tiền của userId of orderId
                    const data_userNow = {
                        money: userInfo.money + productInfo.total,
                    };
            
                    // Gửi yêu cầu POST để cập nhật số tiền của người đang đăng nhập
                    await api.post(`https://localhost:7227/api/User/update-money?id=${userInfo.userId}`, data_userNow);
                    alert(`You have successfully refunded the money `);
                    navigate("/content");
                  }
            
                  // const paymentResponse = await api.get(`https://localhost:7227/api/Payment/get-payments`);
                  // const allPayment = paymentResponse.data.$values;
                  // const userPayment = allPayment.filter(order => order.orderId === ord);    
                  //     setPayment(userPayment);
                } catch (error) {
                  console.error('Error refund:', error);
                }
              };


  return (
    <LayoutMorder>
    <div className="send-page">
      <h1>Sending Money History</h1>
      <div className="send-product-infos1">
      <div className="recieve-Atwork">Artwork</div>
                            <div className="recieve-Actor">Artist</div> 
                            <div  className="recieve-NameAtwork">Buyer</div>   
                            
                            <div className="recieve-TimeApprove">Time Transfer</div>
                            <div className="recieve-TimeApprove">Total</div>
                            <div className="recieve-StatusApprove">Status</div>
                            <div className="recieve-StatusApprove">Action</div>
                            
                        </div>
      <div className="recieve-history-list">
        {payment.map((item) => (
            !item.statusCancle && userOrder[item.orderId] &&
            orderList[item.orderId] && artworkList[orderList[item.orderId].artworkId] && 
            // userNameMap[item.userId] &&
          <div key={item.$id} className="recieve-boxR">
            <img src={artworkList[orderList[item.orderId].artworkId].imageUrl} alt="Product" />

                        {/* <div className="product-info"> */}
                        {/* <div className="name">{item.orderId}</div> */}
                            <div className="send-name">{ artworkList[orderList[item.orderId].artworkId].userName}  </div>
                            <div  className="send-name">{userOrder[item.orderId].userName}</div>   
                            {/* <div className="send-name">{item.orderId}  </div> */}
                            {/* <div className="name">{userNameMap[item.(artworkList[item.artworkId].userId)]}  </div> */}
                            <div className="send-time">{item.createDate}</div> 
                            <div  className="send-titleR">{item.amount}</div>   
                            <div className="send-status">{orderList[item.orderId].statusCancel ? "Waiting" : "Canceled"}</div>
                            {orderList[item.orderId].statusCancel && ( 
                            <button onClick={() => handleRefund(item.orderId)}><div className="recieve-StatusApprove">Confirm</div></button>
                            )}
                        </div>
        //   </div>
    
        ))}
      </div>
    </div>
    </LayoutMorder>
  );
}

export default Refund;
