import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Na from "./Napage";
import api from "../components/utils/requestAPI"; 
import useAuth from "../hooks/useAuth";
import './SavePage.css'; 

const SavePage = () => {
  const { auth } = useAuth();
  const [savedProducts, setSavedProducts] = useState([]);
  const [artworks, setArtworks] = useState({});
  const [showRemoveNotification, setShowRemoveNotification] = useState(false); 

  useEffect(() => {
    if (auth.user) {
      const fetchSavedProducts = async () => {
        try {
          const response = await api.get(`https://localhost:7227/api/LikeCollection/get-all-collection-by-userid?id=${auth.user.userId}`);
          if (Array.isArray(response.data.$values)) {
            const savedProductIds = response.data.$values.map(item => item.artworkId);
            setSavedProducts(savedProductIds);
            await fetchArtworks(savedProductIds);
          } else {
            console.error('Response data is not an array:', response.data);
          }
        } catch (error) {
          console.error('Error fetching saved products:', error);
        }
      };
      fetchSavedProducts();
    } else {
      setSavedProducts([]);
    }
  }, [auth.user]);

  const fetchArtworks = async (artworkIds) => {
    try {
      const promises = artworkIds.map(id =>
        api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${id}`)
      );
      const responses = await Promise.all(promises);
      const artworkMap = {};
      responses.forEach((response, index) => {
        const artworkData = response.data;
        artworkMap[artworkIds[index]] = artworkData;
      });
      setArtworks(artworkMap);
    } catch (error) {
      console.error('Error fetching artwork data:', error);
    }
  };

  const handleUnLove = async (productId, userId) => {
    // Hỏi người dùng xác nhận trước khi xóa
    const confirmed = window.confirm("Are you sure you want to remove this saved product?");
    
    // Nếu người dùng xác nhận muốn xóa
    if (confirmed) {
      try {
        await api.delete(`https://localhost:7227/api/LikeCollection/Un-Love`, { data: { userId: auth.user.userId, artworkId: productId }});
        setSavedProducts(savedProducts.filter(id => id !== productId));
        setShowRemoveNotification(true);
        setTimeout(() => {
          setShowRemoveNotification(false);
        }, 3000);
      } catch (error) {
        console.error('Error removing like:', error);
      }
    }
  };
  
  
  return (
    <div>
      <Na className="Navuser" />
     
      <div className="product-lists">
        {/* Hiển thị danh sách sản phẩm đã lưu */}
        {savedProducts.map((productId) => (
          <div key={productId} className="product-items">
            {/* Hiển thị thông tin sản phẩm */}
            <Link to={`/detail/${productId}`}>
              <img src={artworks[productId]?.imageUrl} alt={artworks[productId]?.title} className="product-imagess" />
              <p className="product-names">{artworks[productId]?.title}</p>
              <p className="product-prices">{artworks[productId]?.price}</p>
            </Link>
            <FaHeart className="heart-icons" onClick={() => handleUnLove(artworks[productId]?.artworkId, auth.user.userId)} />
          </div>
        ))}
         {showRemoveNotification && ( // Hiển thị thông báo nếu showRemoveNotification là true
        <div className="notification-remove">
          Remove Artwork From Saved
        </div>
      )}
      </div>
    </div>
  );
};

export default SavePage;
