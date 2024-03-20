import React, { useState, useEffect } from 'react';
import api from '../../../../components/utils/requestAPI';
import'./Report.css';
import LayoutMorder from "../../../../components/layout/LayoutMorder";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await api.get(`https://localhost:7227/api/Artwork/get-history-artwork-true`);
        setHistory(response.data.$values);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    }

    fetchHistory();
  }, []);

  return (
    <LayoutMorder>
    <div className="history-page">
      <h1>History</h1>
      <div className="product-infos1">
                            <div className='AtworkS'><div className="Atwork">Artwork</div></div>
                            <div  className="NameAtwork">Name</div>   
                            <div className="Actor">Actor</div> 
                            <div className="TimeApprove">Time Approve</div>
                            <div className="StatusApprove">Status</div>
                            
                        </div>
      <div className="history-list">
        {history.map((item) => (
          <div key={item.artworkId} className="boxR">
            <img src={item.imageUrl} alt="Product" />
                        <div className="product-info">
                            <div className="name">Artwork: {item.description}</div>
                            <div  className="titleR">{item.title}</div>   
                            <div className="time">Time: {item.timeProcessing}</div> 
                            <div className="status">Status: {item.statusProcessing}</div>
                            
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
