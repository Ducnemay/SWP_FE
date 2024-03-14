import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaVirusSlash } from "react-icons/fa";
import ReactPaginate from 'react-paginate';

import { Link, useNavigate } from 'react-router-dom';
import api from "../components/utils/requestAPI"; // Import the api module
import useAuth from "../hooks/useAuth";
import "./HomePage.css";

const HomePage = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showNotification, setShowNotification] = useState(false); // Thêm state cho hiển thị thông báo
  const [showRemoveNotification, setShowRemoveNotification] = useState(false); // Thêm state cho hiển thị thông báo khi unlove
  const productsPerPage = 6;

  const [artworkList, setArtworkList] = useState(null);
  const [userMap, setUserMap] = useState({}); // State để lưu thông tin người dùng
  const { auth } = useAuth();
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  useEffect(() => {
    const fetchArtworks = async () => {
      const url = "https://localhost:7227/api/Artwork/get-all";
      try {
        const response = await api.get(url);
        const extractedArtworks = response.data.$values || [];
        setArtworkList(extractedArtworks);
        const userIds = extractedArtworks.map(product => product.userId);
        fetchUsers(userIds);
      } catch (error) {
        console.error('Error fetching artwork data:', error);
      }
    };

    fetchArtworks();
  }, []);

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

  const fetchUsers = async (userIds) => {
    try {
      const promises = userIds.map(userId =>
        api.post("https://localhost:7227/api/User/get-by-id", { id: userId })
      );
      const responses = await Promise.all(promises);
      const userMap = {};
      responses.forEach((response, index) => {
        const userData = response.data;
        const userId = userIds[index];
        userMap[userId] = userData;
      });
      setUserMap(userMap);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (artworkList && artworkList.length > 0) {
      const userIds = artworkList.map(product => product.userId);
      fetchUsers(userIds);
    }
  }, [artworkList]);

  if (!artworkList || !Array.isArray(artworkList)) {
    return <span className="loader"></span>
  }

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = artworkList.slice(indexOfFirstProduct, indexOfLastProduct);

  const isProductLiked = (productId) => {
    return savedProducts.includes(productId);
  };

  const pageCount = Math.ceil(artworkList.length / productsPerPage);

  const handleLikeToggle = async (event, id, userId) => {
    event.preventDefault();

    if (!auth.user) {
      navigate('/log-in');
      return;
    }

    try {
      const isLiked = !isProductLiked(id); // Xác định hành động là "love" hay "unlove"
      const requestData = {
        userId: auth.user.userId,
        artworkId: id,
        time: new Date().toISOString() // Thêm trường thời gian
      };

      if (isLiked) {
        await api.post(`https://localhost:7227/api/LikeCollection/Love`, requestData);
        setSavedProducts(prevSavedProducts => [...prevSavedProducts, id]);
        setShowNotification(true); // Hiển thị thông báo
        setTimeout(() => {
          setShowNotification(false); // Ẩn thông báo sau 3 giây
        }, 3000);
      } else {
        await api.delete(`https://localhost:7227/api/LikeCollection/Un-Love`, { data: { userId: auth.user.userId, artworkId: id } });
        setSavedProducts(prevSavedProducts => prevSavedProducts.filter(productId => productId !== id));
        setShowRemoveNotification(true); // Hiển thị thông báo khi unlove
        setTimeout(() => {
          setShowRemoveNotification(false); // Ẩn thông báo sau 3 giây
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
    <div className="product-page">
      <h1 className="main-tieude">Collect art and design online</h1>
      <div className="product-list">
        {currentProducts.map((product) => (
          <div key={product.artworkId} className="product-itemm">
            <div className="product-card">
              <Link to={`/detail/${product.artworkId}`} className="product-link" key={product.artworkId}>
                <div className="product-images">
                  <img src={product.imageUrl} alt={product.title} className="product-imagee" />
                </div>
              </Link>
              <div className="product-content">
                <p>Tác giả: {userMap[product.userId]?.username}</p>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-prices">Giá: {product.price}</p>
                <div className="button-heart">
                  <button onClick={(event) => handleLikeToggle(event, product.artworkId, product.userId)} className={`like-button ${isProductLiked(product.artworkId) ? 'liked' : ''}`}>
                    {isProductLiked(product.artworkId) ? <FaHeart /> : <FaRegHeart />}
                  </button>

                  <button className="Report-button" value={product.reporting} onChange={(e) => handleReportSelect(e, product.id)}>
                    <Link to={`/artreport/${product.artworkId}`}>
                      <FaVirusSlash /> {/* Thay thế bằng icon FaVirus */}
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      {showNotification && ( // Hiển thị thông báo nếu showNotification là true
        <div className="notification">
          Artwork Saved
        </div>
      )}
      {showRemoveNotification && ( // Hiển thị thông báo nếu showRemoveNotification là true
        <div className="notification-remove">
          Remove Artwork From Saved
        </div>
      )}
    </div>
  );
};

export default HomePage;
