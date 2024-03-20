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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.user) { // Kiểm tra xem auth.user đã được định nghĩa chưa
          const response = await api.post("https://localhost:7227/api/User/get-by-id", { userId: auth.user.userId });
          setUser(response.data);
          // Lấy tất cả các artwork từ API
          // const responseArtworks = await api.get("https://localhost:7227/api/Artwork/get-all");
          // const allArtworks = responseArtworks.data.$values;

          // Lọc ra các artwork có userId trùng với userId của user
          // const userArtworks = allArtworks.filter(artwork => artwork.userId === auth.user.userId);

          // setArtworkList(userArtworks);
          // setLoading(false);
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
        ~MODERATOR  PAGE~
      </div>
      <div className="bottom-section">
        <div className="menu-item"><Link to ="/content">CONTENT</Link> </div>
        <div className="menu-item"><Link to ="/report">MORDERATE HISTORY</Link></div>
        <div className="menu-item"><Link to ="/transfer">TRANSFER HISTORY</Link></div>
        <div className="menu-item">WALLET : {user?.money}</div>
        
      </div>
      
    </div>
    
  );
}
// className="menu-item"