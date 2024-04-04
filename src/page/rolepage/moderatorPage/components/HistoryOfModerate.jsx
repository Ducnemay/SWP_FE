import React, { useState, useEffect } from 'react';
import api from '../../../../components/utils/requestAPI';
import'./HistoryOfModerate.css';
import LayoutMorder from "../../../../components/layout/LayoutMorder";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [artworks, setArtwork] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await api.get(`https://localhost:7227/api/Artwork/get-history-artwork-true`);
        const filteredOrders = response.data.$values.filter(order => response.data.$values.map(payment => payment.artworkId).includes(order.artworkId));
        setHistory(filteredOrders);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    }

    fetchHistory();
  }, []);


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
  const fetchArtworkDatas = async () => {
    try {
      const artworkPromises = history.map(ord => api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${ord.artworkId}`));
      const artworks = await Promise.all(artworkPromises);
      const userIds = artworks.map(artwork => artwork.data.userId);
      
      // Lấy tên người dùng từ userIds
      const userNames = await fetchUserNames(userIds);
      
      const artworkLists = artworks.reduce((acc, artwork, index) => {
        const userId = artwork.data.userId;
        const userName = userNames[index]; // Lấy tên người dùng tương ứng với userId
        acc[history[index].artworkId] = {
          ...artwork.data,
          userName: userName // Thêm thông tin tên người dùng vào đối tượng artwork
        };
        return acc;
      }, {});
  
      setArtwork(artworkLists);
    } catch (error) {
      console.error('Error fetching artwork data:', error);
    }
      };
      if (history.length > 0) {
        fetchArtworkDatas();
      }
      }, [history]);

  return (
    <LayoutMorder>
    <div className="history-page">
    <h1>History</h1>
    <table className="history-product-table">
        <thead>
            <tr>
                <th>Artwork</th>
                <th>Name</th>
                <th>Actor</th>
                <th>Time Approve</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {history.map((item) => (
                artworks[item.artworkId] &&
                <tr key={item.$id}>
                    <td className="img-his"><img src={item.imageUrl} alt="Product" /></td>
                    <td>{artworks[item.artworkId].userName}</td>
                    <td>{item.title}</td>
                    <td>{item.timeProcessing}</td>
                    <td style={{
                          // fontWeight:"bold",
                          // textDecoration:"underline",
                          fontStyle:"italic"
                            }}>{item.statusProcessing ? "Success" : "Waiting"}</td>
                </tr>
            ))}
        </tbody>
    </table>
    <><p
          style={{
            paddingTop:"20px"
          }}
          className="foot-sidebar">Copyright &copy; 2024 AtWorks</p></>
</div>

    </LayoutMorder>
  );
}

export default HistoryPage;