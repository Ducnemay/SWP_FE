// src/components/Header.js

import "./Header.css";
import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../../../components/utils/requestAPI";
import useAuth from "../../../../hooks/useAuth";

export default function Header(){
  const { auth } = useAuth();
  const [user, setUser] = useState(null);

  const [showTransferOptions, setShowTransferOptions] = useState(false);

  const toggleTransferOptions = () => {
    setShowTransferOptions(!showTransferOptions);
  };

  const handleMouseEnter = () => {
    setShowTransferOptions(true);
  };

  const handleMouseLeave = () => {
    setShowTransferOptions(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.user) { // Kiểm tra xem auth.user đã được định nghĩa chưa
          const response = await api.post("https://localhost:7227/api/User/get-by-id", { userId: auth.user.userId });
          setUser(response.data);
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      
    };

    fetchUserData();
  }, [auth]);
  return (
    <div className="header">
      <div className="top-section">
        <div className="img-admin"> 
          <img src="/public/logoAdmin.png" alt="logoAdmin"></img>
        </div>
       
        <div>MODERATOR  PAGE</div>
        <div 
            style={{ paddingLeft:"700px",
                     fontSize: "30px",
                     paddingTop:"40px",
                    //  textDecoration: "underline",
                     textDecorationThickness: "1px"
          }} 
            ><i class="fa-solid fa-sack-dollar"></i>&nbsp;WALLET : ${user?.money}</div>
      </div>
      <div className="bottom-section">
      <div className="menu-item"><Link to ="/req-content">REQUEST CONTENT</Link> </div>
        <div className="menu-item"><Link to ="/content">CONTENT</Link> </div>
        <div className="menu-item"><Link to ="/history">MORDERATE HISTORY</Link></div>
        <div 
          className="menu-item"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        <div className="menu-item"><Link to ="">TRANSFER HISTORY</Link></div>
        {showTransferOptions && (
          <div className="transfer-options">
            <div className="menu-subitem">
              <Link to="/transfer">Receive</Link>
            </div>
            <div className="menu-subitem">
              <Link to="/send">Send</Link>
            </div>
          </div>
        )}
        </div>
        <div className="menu-item"><Link to ="/report">REPORT</Link></div>
        
      </div>
      
    </div>
    
  );
}
// className="menu-item"