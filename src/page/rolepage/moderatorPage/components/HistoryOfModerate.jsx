import React, { useState, useEffect } from 'react';
import api from '../../../../components/utils/requestAPI';
import'./HistoryOfModerate.css';
import LayoutMorder from "../../../../components/layout/LayoutMorder";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [artworks, setArtwork] = useState([]);
  const formatCash = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await api.get(`https://localhost:7227/api/Artwork/get-all`);
        const filteredOrders = response.data.$values.filter(artwork =>
          ["Approve", "Missing Signature", "Copying Artwork", "18+ Artwork is not allowed"].includes(artwork.reason));
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
      <div className="history-product-infos1">
                           <div className="history-Atwork">Artwork</div>
                           <div className="history-Actor">Actor</div> 
                            <div  className="history-NameAtwork">Unit Price</div>   
                            <div className="history-TimeApprove">Time Processing</div>
                            <div className="history-StatusApprove">Status</div>
                            
                        </div>
      <div className="history-list">
        {history.map((item) => (
          artworks[item.artworkId] &&
          <div key={item.$id} className="history-boxR">
            <img src={item.imageUrl} alt="Product" />
                        <div className="history-product-info">
                            <div className="history-name">{artworks[item.artworkId].userName}</div>
                            <div className="history-titleR">₫{formatCash(item.price)}</div>   
                            <div className="history-time"
                              >{item.timeProcessing}</div> 
                            <div className="history-status"
                              >{item.statusProcessing ? "Approve" : "Unapprove"}</div>
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

export default HistoryPage;