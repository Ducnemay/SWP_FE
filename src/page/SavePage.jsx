import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Na from "./Napage";
import api from "../components/utils/requestAPI"; 
import useAuth from "../hooks/useAuth";
import './SavePage.css'; 

const SavePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [savedProducts, setSavedProducts] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [showRemoveNotification, setShowRemoveNotification] = useState(false); 

  $(function() {
    $('.product-imagess').watermark();
  });

  useEffect(() => {
    if (auth.user) {
      const fetchSavedProducts = async () => {
        try {
          const response = await api.get(`https://localhost:7227/api/LikeCollection/get-all-collection-by-userid?id=${auth.user.userId}`);
          if (Array.isArray(response.data.$values)) {
            const savedProductIds = response.data.$values
            // .map(item => item.artworkId);
            setSavedProducts(savedProductIds);
            // await fetchArtworks(savedProductIds);
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

  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        const artworkPromises = savedProducts.map(id => api.get(`https://localhost:7227/api/Artwork/get-by-id?id=${id.artworkId}`));
        const artworks = await Promise.all(artworkPromises);
        
        const artworkList = artworks.reduce((acc, artwork, index) => {
          acc[savedProducts[index].artworkId] = artwork.data;
          return acc;
        }, {});
    
        setArtworks(artworkList);
      } catch (error) {
        console.error('Error fetching artwork data:', error);
      }
        };
      if (savedProducts.length > 0) {
            fetchArtworkData();
          }
        }, [savedProducts]);

        
  const handleUnLove = async (productId, userId) => {
    // Hỏi người dùng xác nhận trước khi xóa
    const confirmed = window.confirm("Are you sure you want to remove this saved product?");
    
    // Nếu người dùng xác nhận muốn xóa
    if (confirmed) {
      try {
        await api.delete(`https://localhost:7227/api/LikeCollection/Un-Love`, { data: { userId: auth.user.userId, artworkId: productId }});
        setSavedProducts(savedProducts.filter(id => id.artworkId !== productId));
        setShowRemoveNotification(true);
        setTimeout(() => {
          setShowRemoveNotification(false);
        }, 3000);
        // window.location.reload(); 
        // navigate("/saves");
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
          artworks[productId.artworkId] &&
          <div key={productId} className="product-items">
            {/* Hiển thị thông tin sản phẩm */}
            <Link to={`/detail/${productId.artworkId}`}>
              <img src={ artworks[productId.artworkId]?.imageUrl} alt={artworks[productId.artworkId]?.title} className="product-imagess" />
              <p className="product-names">{artworks[productId.artworkId]?.title}</p>
              <p className="product-prices">{artworks[productId.artworkId]?.price}</p>
            </Link>
            <FaHeart className="heart-icons" onClick={() => handleUnLove(artworks[productId.artworkId]?.artworkId, auth.user.userId)} />
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