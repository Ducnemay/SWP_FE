import React, { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';
import api from '../../../../components/utils/requestAPI';
import'./Send.css';
import LayoutMorder from "../../../../components/layout/LayoutMorder";
import { useNavigate } from 'react-router-dom';

function Send() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [userName, setUserName] = useState([]);
    const [payment, setPayment] = useState([]);
    const { auth } = useAuth();
    const [user, setUser] = useState(null);
    const [artworkList, setArtworkList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [approved, setApproved] = useState(false);
    const currentDate = new Date();
    const isoString = currentDate.toISOString();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API để lấy thông tin payment
                const paymentResponse = await api.get(`https://localhost:7227/api/Payment/get-payments`);
                // const paymentData = paymentResponse.data.$values;
                const paymentData = paymentResponse.data.$values;
                paymentData.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
                // Lấy thông tin orderId thông qua paymentId
                const order_Id = paymentData.orderId

                //Lấy thông tin artworkId thông qua orderId
                
                // Cập nhật state với thông tin sản phẩm và người dùng
                setPayment(paymentData);
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

  return (
    <LayoutMorder>
        <div className="send-page">
        <h1>Sending Money History</h1>
        <table className="send-product-table">
            <thead>
                <tr>
                    <th>PaymentId</th>
                    <th>Recieve Person</th>
                    <th>Amount</th>
                    <th>Create Transfer</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {payment.map((item) => (
                    orderList[item.orderId] && artworkList[orderList[item.orderId].artworkId] &&
                    <tr key={item.$id}>
                        <td>{item.paymentId}</td>
                        <td>{artworkList[orderList[item.orderId].artworkId].userName}</td>
                        <td>- ${item.amount}</td>
                        <td>{item.createDate}</td>
                        <td style={{
                          // fontWeight:"bold",
                          // textDecoration:"underline",
                          fontStyle:"italic"
                            }}>{item.status ? "Success" : "Waiting"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <><p
          style={{
            paddingTop:"20px",
          }}
          className="foot-sidebar">Copyright &copy; 2024 ArtWorks</p></>
    </div>

    </LayoutMorder>
  );
}

export default Send;
