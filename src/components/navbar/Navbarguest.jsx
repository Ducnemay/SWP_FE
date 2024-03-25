// Navbar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import { FaRegBell, FaRegEnvelope, FaRegUserCircle } from "react-icons/fa";

const Navbarguest = () => {
  return (
    <nav>
      <div className="icons">
        <img src="https://tse1.mm.bing.net/th?id=OIP.RD4Ofna7_k2J6uwAnp-sIAAAAA&pid=Api&P=0&h=180" alt="Logo" />
        <div className="search-container">
          <img src="https://www.thinkafrica.fi/wp-content/uploads/2019/04/search-icon.png" alt="Search" />
          <input type="text" placeholder="Search..." />
        </div>
        <li><NavLink to="/sell">Sell</NavLink></li>
        <li><NavLink to="/price-database">Price Database</NavLink></li>
        <li><NavLink to="/editorial">Editorial</NavLink></li>
        <button className="icon-button" onClick={() => console.log('Button clicked')}>
          <FaRegBell className="icon" />
        </button>
        <button className="icon-button" onClick={() => console.log('Button clicked')}>
          <FaRegEnvelope className="icon" />
        </button>
        <button className="icon-button" onClick={() => console.log('Button clicked')}>
          <FaRegUserCircle className="icon" />
        </button>
        {/* Login and Sign Up buttons */}
        <button className="login-button" onClick={() => console.log('Login clicked')}>Login</button>
        <button className="signup-button" onClick={() => console.log('Sign Up clicked')}>Sign Up</button>
      </div>
      <div className="nav-list">
        <ul>
          <li><NavLink to="/artist">Artist</NavLink></li>
          <li><NavLink to="/artworks">Artworks</NavLink></li>
          <li><NavLink to="/auction">Auction</NavLink></li>
          <li><NavLink to="/viewing-room">Viewing Room</NavLink></li>
          <li><NavLink to="/galleries">Galleries</NavLink></li>
          <li><NavLink to="/fairs-shows">Fairs Shows</NavLink></li>
          <li><NavLink to="/museums">Museums</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbarguest;
