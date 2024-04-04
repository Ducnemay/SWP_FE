import React, { useState, useEffect } from 'react';
import api from '../../../../components/utils/requestAPI';
import'./Report.css';
import LayoutMorder from "../../../../components/layout/LayoutMorder";

function ReportPage() {
  const [report, setReport] = useState([]);
  const [artworkList, setArtworkList] = useState([]);
  const [user, setUser] = useState([]);
  const [representativeReports, setRepresentativeReports] = useState({});
  const [artworkIdCount, setArtworkIdCount] = useState({});

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await api.get(`https://localhost:7227/api/Report/get-all`);
        const allReport = response.data.$values
        allReport.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));
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

          useEffect(() => {
            const findRepresentativeReports = () => {
              const representativeReportsObject = {};
              report.forEach(rep => {
                if (!representativeReportsObject[rep.artworkId]) {
                  representativeReportsObject[rep.artworkId] = rep;
                } else {
                  if (new Date(rep.reportDate) < new Date(representativeReportsObject[rep.artworkId].reportDate)) {
                    representativeReportsObject[rep.artworkId] = rep;
                  }
                }
              });
              setRepresentativeReports(representativeReportsObject);
            };
            findRepresentativeReports();
          }, [report]);

          useEffect(() => {
            const countArtworkIds = () => {
              const counts = {};
              report.forEach(rep => {
                counts[rep.artworkId] = (counts[rep.artworkId] || 0) + 1;
              });
              setArtworkIdCount(counts);
            };
            countArtworkIds();
          }, [report]);

  return (
    <LayoutMorder>
        <div className="report-page">
        <table className="report-product-table">
            <thead>
                <tr>
                    <th>Artwork Image</th>
                    <th>Artwork Owner</th>
                    <th>Artwork Title</th>
                    <th>Reporter Name</th>
                    <th>Report Content</th>
                    <th>Report Time</th>
                    <th>Report Count</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(representativeReports).map((item) => (
                    artworkList[item.artworkId] && user[item.userId] &&
                    <tr key={item.$id}>
                        <td className="img-report"><img src={artworkList[item.artworkId].imageUrl} alt="Product" /></td>
                        <td>{artworkList[item.artworkId].userName}</td>
                        <td>{artworkList[item.artworkId].title}</td>
                        <td>{user[item.userId].username}</td>
                        <td>{item.description}</td>
                        <td>{item.reportDate}</td>
                        <td>{artworkIdCount[item.artworkId]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <><p
          style={{
            paddingTop:"20px"
          }}
          className="foot-sidebar">Copyright &copy; 2024 ArtWorks</p></>
    </div>

    </LayoutMorder>
  );
}

export default ReportPage;
