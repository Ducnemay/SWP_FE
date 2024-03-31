
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../components/utils/requestAPI';
import './Artispage.css';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaVirusSlash } from "react-icons/fa";

const Artistpage = () => {
    const [artistInfo, setArtistInfo] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const { userId } = useParams();
    const { auth } = useAuth();
    const [savedProducts, setSavedProducts] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
  const [showRemoveNotification, setShowRemoveNotification] = useState(false);

  $(function() {
    $('.artist-imagee').watermark();
  });

  //   $(function() {
  //   $('.artist-imagee').watermark({
  //     text: 'ARTWORK',
  //     textWidth: 200,
  //     gravity: 'nw',
  //     opacity: 1,
  //     margin: 12
  //   });
  // });

    useEffect(() => {
        fetchArtistInfo();
        fetchUserArtworks();
    }, [userId]);

    const fetchArtistInfo = async () => {
        try {
            const response = await api.post('https://localhost:7227/api/User/get-by-id', { userId });
            if (response.status !== 200) {
                throw new Error('Failed to fetch artist info');
            }
            const userData = response.data;
            setArtistInfo(userData);
        } catch (error) {
            console.error('Error fetching artist info:', error);
        }
    };

    const fetchUserArtworks = async () => {
        try {
            const response = await api.get(`https://localhost:7227/api/Artwork/get-all-artwork-by-userid?userId=${userId}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch user artworks');
            }
            const extractedArtworks = response.data.$values || []; // Extract artworks from the API response
            setArtworks(Array.isArray(extractedArtworks) ? extractedArtworks : []);
        } catch (error) {
            console.error('Error fetching user artworks:', error);
            setArtworks([]);
        }
    };
    useEffect(() => {
        if (auth.user) {
          const fetchSavedProducts = async () => {
            try {
              const response = await api.get(`https://localhost:7227/api/LikeCollection/get-all-collection-by-userid?id=${auth.user.userId}`);
              if (Array.isArray(response.data.$values)) {
                const savedProductIds = response.data.$values.map(item => item.artworkId);
                setSavedProducts(savedProductIds);
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
      const isProductLiked = (productId) => {
        return savedProducts.includes(productId);
      };
      const handleLikeToggle = async (event, id, userId) => {
        event.preventDefault();
      
        if (!auth.user) {
          navigate('/log-in');
          return;
        }
      
        try {
          const isLiked = !isProductLiked(id);
          const requestData = {
            userId: auth.user.userId,
            artworkId: id,
            time: new Date().toISOString()
          };
      
          if (isLiked) {
            await api.post(`https://localhost:7227/api/LikeCollection/Love`, requestData);
            setSavedProducts(prevSavedProducts => [...prevSavedProducts, id]);
            // Cập nhật số lượt thích của sản phẩm ngay khi được thích
            setArtworks(prevArtworkList => 
              prevArtworkList.map(item => item.artworkId === id ? { ...item, likeTimes: item.likeTimes + 1 } : item)
            );
            setShowNotification(true);
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          } else {
            await api.delete(`https://localhost:7227/api/LikeCollection/Un-Love`, { data: { userId: auth.user.userId, artworkId: id } });
            setSavedProducts(prevSavedProducts => prevSavedProducts.filter(productId => productId !== id));
            // Cập nhật số lượt thích của sản phẩm ngay khi bỏ thích
            setArtworks(prevArtworkList => 
              prevArtworkList.map(item => item.artworkId === id ? { ...item, likeTimes: item.likeTimes - 1 } : item)
            );
            setShowRemoveNotification(true);
            setTimeout(() => {
              setShowRemoveNotification(false);
            }, 3000);
          }
        } catch (error) {
          console.error('Error toggling like:', error);
        }
      };
      const handleReportSelect = (event, productId) => {
        const { value } = event.target;
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.id === productId ? { ...product, reporting: value } : product
          )
        );
      };
    
      

    return (
        <div className="artist-page">
            {/* Artist information */}
            {artistInfo && (
  <div className="artist-info-container">
    <div className="artist-info">
      <img src={artistInfo.imageUrl} className="artist-image" />
      <div className="artist-detail">
        <h2 className="artist-name">{artistInfo.fullname}</h2>
        <p className="artist-address">{artistInfo.address}</p>
      </div>
    </div>
  </div>
)}


            {/* Artwork grid */}
            <div className="artist-artwork">
                {artworks.map(artwork => (
                    <div key={artwork.id} className="artist-card">
                        <img src={artwork.imageUrl} alt={artwork.title} className="artist-imagee" />
                        <div className="artist-details">
                            <h3 className="artist-artwork-title">{artwork.title}</h3>
                            <p className="artist-artwork-price">{artwork.price}</p>
    <div className="button-heart">
                      
                       
                  <p className="product-liketimes">{artwork.likeTimes}</p>
                  <button onClick={(event) => handleLikeToggle(event, artwork.artworkId, artwork.userId)} className={`like-button ${isProductLiked(artwork.artworkId) ? 'liked' : ''}`}>
                    {isProductLiked(artwork.artworkId) ? <FaHeart /> : <FaRegHeart />}
                    
                  </button>
                  <button className="Report-button" value={artwork.reporting} onChange={(e) => handleReportSelect(e, artwork.id)}>
                    <Link to={`/artreport/${artwork.artworkId}`}>
                      <FaVirusSlash /> {/* Thay thế bằng icon FaVirus */}
                    </Link>
                  </button>
                
                </div>


                        </div>
                    
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Artistpage;