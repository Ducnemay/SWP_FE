import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import "./NavBar.css";
import { FaRegBell, FaRegEnvelope, FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import useAuth from '../../hooks/useAuth'; // Import useAuth từ hook đã tạo
import api from '../../components/utils/requestAPI';

const NavBar = () => {
  const { auth } = useAuth(); // Sử dụng hook useAuth để lấy trạng thái đăng nhập
  const navigate = useNavigate();
  const [showArtworkButton, setShowArtworkButton] = useState(false);
  const [showArtistButton, setShowArtistButton] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSubNav, setShowSubNav] = useState(false); // State để kiểm soát hiển thị của subnavitem
  const [showDropdown, setShowDropdown] = useState(false);
  const [priceFilter, setPriceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [purchaseFilter, setPurchaseFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false); // Trạng thái để xác định liệu nên hiển thị bộ lọc hay không

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    if (inputValue.trim() !== '') {
      setShowArtworkButton(true);
      setShowArtistButton(true);
    } else {
      setShowArtworkButton(false);
      setShowArtistButton(false);
    }
  };

  const searchArtworkByName = async (name) => {
    try {
      const response = await api.get(`https://localhost:7227/api/Artwork/search-by-name?name=${name}`);
      // Trả về danh sách các artwork từ response API hoặc một mảng rỗng nếu không có kết quả
      return response.data.$values || [];
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  const handleSearch = async (searchType) => {
    try {
      let searchResults = [];
      if (searchType === 'artwork') {
        searchResults = await searchArtworkByName(searchInput);
      } else if (searchType === 'artist') {
        // Gọi hàm tìm kiếm nghệ sĩ ở đây nếu cần
      }
      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleUserCircleClick = () => {
    setShowSubNav(!showSubNav); // Khi click vào biểu tượng, đảo ngược trạng thái hiển thị của subnavitem
  };

  const handleLogout = () => {
    localStorage.clear();
    auth.user = null;
    () => window.location.reload(false);
    navigate("/home");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handlePurchaseFilterChange = (event) => {
    setPurchaseFilter(event.target.value);
  };

  const handleApplyFilters = () => {
    setShowFilters(true); // Hiển thị bộ lọc khi người dùng nhấp vào nút "Filter"
  };

  return (
    <nav className="Nav-main">
      <div className="icons">
        <Link to="/home">
          <img src="\nenart.jpg" alt="Logo"  className="logo-images" />
        </Link>
        <div className="search-container">
          <img src="https://www.thinkafrica.fi/wp-content/uploads/2019/04/search-icon.png" alt="Search" />
          <input type="text" placeholder="Search..." className="search-input" onChange={handleInputChange} />
        </div>
        {showArtworkButton && <button className="search-button" onClick={() => handleSearch('artwork')}>Artwork</button>}
        {showArtistButton && <button className="search-button" onClick={() => handleSearch('artist')}>Artist</button>}
        <button className="icon-button" onClick={() => console.log('Button clicked')}>
          <FaRegBell className="icon" />
        </button>
        <button className="icon-button" onClick={() => console.log('Button clicked')}>
          <FaRegEnvelope className="icon" />
        </button>
        <button className="icon-button" onClick={handleUserCircleClick}>
          <FaRegUserCircle className="icon" />
        </button>
        {auth.user ? (
          <div className="sub-nav" style={{ display: showSubNav ? 'block' : 'none' }}>
            <ul>
              <li><NavLink to="/page-m"
                style={{ color: "black", textDecoration:"none"}}
                >My Collection</NavLink>
                </li>
              <li><NavLink to="/save"
                style={{ color: "black", textDecoration:"none"}}
                >Save</NavLink>
                </li>
              <li><NavLink to="/edit"
                style={{ color: "black", textDecoration:"none"}}
                >Edit</NavLink>
                </li>
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  <FaSignOutAlt className="logout-icon" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="auth-buttons">
            <button className="login-button" onClick={() => navigate("/log-in")}>Login</button>
            <button className="signup-button" onClick={() => navigate("/sign-up")}>Sign Up</button>
          </div>
        )}
      </div>
      {searchInput.trim() !== '' && (
        <div className="search-results">
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div key={index} className="search-result-item">
                <div className="image-wrapper" onClick={() => navigate(`/detail/${result.artworkId}`)}>
                  <img src={result.imageUrl} alt={result.title} />
                </div>
                <div className="result-details">
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}

      <div className="nav-list">
        <ul>
          <li><NavLink to="/artworks" style={{ color: "black", textDecoration:"none"}}>Artworks</NavLink></li>
          <li><NavLink to="/auction" style={{ color: "black", textDecoration:"none"}}>Auction</NavLink></li>
          <li><NavLink to="/viewing-room" style={{ color: "black", textDecoration:"none"}}>Viewing Room</NavLink></li>
          <li><NavLink to="/galleries" style={{ color: "black", textDecoration:"none"}}>Galleries</NavLink></li>
          <li><NavLink to="/fairs-shows" style={{ color: "black", textDecoration:"none"}}>Fairs Shows</NavLink></li>
          <li onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <span style={{
              color: "black",
              }}>BXH</span>
            {showDropdown && (
              <ul className="dropdown" 
                style={{ display: showDropdown ? 'block' : 'none' }}>
                <li><NavLink to="/top-likes" 
                    style={{ color: "black", textDecoration:"none"}}
                    >Top Likes</NavLink>
                    </li>
                <li><NavLink to="/top-authors" 
                    style={{ color: "black", textDecoration:"none"}}
                    >Top Authors</NavLink>
                    </li>
              </ul>
            )}
          </li>
        </ul>
              {/* Bộ lọc */}
          <div className="filter-section">
            <button onClick={handleApplyFilters}>Filter</button>
          </div>
          {showFilters && (
            <>
              <div className="filter-section">
                <label htmlFor="price-filter">Price:</label>
                <select id="price-filter" style={{ color: "black" }} value={priceFilter} onChange={handlePriceFilterChange}>
                  <option value="">All</option>
                  <option value="low-to-high">Low to High</option>
                  <option value="high-to-low">High to Low</option>
                </select>
              </div>
              <div className="filter-section">
                <label htmlFor="date-filter" style={{ color: "black" }}>Date:</label>
                <select id="date-filter" value={dateFilter} onChange={handleDateFilterChange}>
                  <option value="">All</option>
                  <option value="newest-first">Newest First</option>
                  <option value="oldest-first">Oldest First</option>
                </select>
              </div>
              <div className="filter-section">
                <label htmlFor="purchase-filter" style={{ color: "black" }}>Purchase:</label>
                <select id="purchase-filter" value={purchaseFilter} onChange={handlePurchaseFilterChange}>
                  <option value="">All</option>
                  <option value="most-purchased">Most Purchased</option>
                  <option value="least-purchased">Least Purchased</option>
                </select>
              </div>
            </>
          )}
      </div>
    </nav>
  );
}

export default NavBar;
