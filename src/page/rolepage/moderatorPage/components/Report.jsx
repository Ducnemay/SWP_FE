import React, { useState, useEffect } from 'react';
import api from '../../../../components/utils/requestAPI';
import'./Report.css';
import LayoutMorder from "../../../../components/layout/LayoutMorder";

function ReportPage() {
  const [report, setReport] = useState([]);
  const [artworkList, setArtworkList] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await api.get(`https://localhost:7227/api/Report/get-all`);
        const allReport = response.data.$values

        setReport(allReport);
      } catch (error) {
        console.error('Error fetching report:', error);
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
  useEffect(() => {
  const fetchArtworkData = async () => {
    try {
      const artworkPromises = report.map(rep => api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${rep.artworkId}`));
      const artworks = await Promise.all(artworkPromises);
      const userIds = artworks.map(artwork => artwork.data.userId);
      
      // Lấy tên người dùng từ userIds
      const userNames = await fetchUserNames(userIds);
      
      const artworkList = artworks.reduce((acc, artwork, index) => {
        // const userId = artwork.data.userId;
        const userName = userNames[index]; // Lấy tên người dùng tương ứng với userId
        acc[report[index].artworkId] = {
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
    if (report.length > 0) {
          fetchArtworkData();
        }
      }, [report]);

      useEffect(() => {
      const fetchUserData = async () => {
        try {
          // const promises = userIds.map(userId => api.post('https://localhost:7227/api/User/get-by-id', { userId }));
          const userPromises = report.map(rep => api.post(`https://localhost:7227/api/User/get-by-id`,{userId :rep.userId}));
          const users = await Promise.all(userPromises);
          
          const artworkList = users.reduce((acc, user, index) => {
            acc[report[index].userId] = user.data;
              
            return acc;
          }, {});
      
          setUser(artworkList);
        } catch (error) {
          console.error('Error fetching artwork data:', error);
        }
          };
        if (report.length > 0) {
          fetchUserData();
            }
          }, [report]);

  return (
    <LayoutMorder>
    <div className="report-page">
      {/* <h1>History</h1> */}
      <div className="report-list">
        {report.map((item) => (
          artworkList[item.artworkId] && user[item.userId] &&
          <div key={item.$id} className="report-boxR">
            <div className="report-image-box">
            <img src={artworkList[item.artworkId].imageUrl} alt="Product" />
                        
                            <div className="report-image-name">{artworkList[item.artworkId].userName}</div>
                            <div className="report-image-name">{artworkList[item.artworkId].title}</div>
                            </div>
                            <div className="report-product-info">
                            <div  className="report-titleR">Name of reporter: {user[item.userId].username}</div>   
                            <div className="report-time">Content of report: {item.description}</div> 
                            <div className="report-status">Time: {item.reportDate}</div>
                            
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

export default ReportPage;
