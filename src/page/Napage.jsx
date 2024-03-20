import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import useAuth from "../hooks/useAuth";
import api from "../components/utils/requestAPI";

const NavPage = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.user) { // Kiểm tra xem auth.user đã được định nghĩa chưa
          const response = await api.post("https://localhost:7227/api/User/get-by-id", { userId: auth.user.userId });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data or premium order:', error);
      }
    };

    fetchUserData();
  }, [auth]);
  return (
    <div className="navbar-container">
      {user && (
        <div className="user-container">
          <div className="user-infos">
            <div
              className="user-image"
              style={{ backgroundImage: `url("${user.imageUrl}")`, width: '50px', height: '50px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '50%', overflow: 'hidden' }}
            ></div>
            <div className="user-details">
              <h2>{user.username}</h2>
              <p>{user.address}</p>
            </div>
            <div className='user-premium'>
              {user.premiumId ? (
                <p>Pro</p>
              ) : (
                <p>User does not have premium</p>
              )}
            </div>
          </div>
          <a href="/edit" className="settings-button">Settings</a>
        </div>
      )}
      <nav className="nav-container">
        <ul className="sub-nav-list">
          <li>
            <NavLink to="/page-m" className="sub-nav-link">My Collection</NavLink>
          </li>
          <li>
            <NavLink to="/insight" className="sub-nav-link">Insight</NavLink>
          </li>
          <li>
            <NavLink to="/save" className="sub-nav-link">Save</NavLink>
          </li>
          <li>
            <NavLink to="/transHis" className="sub-nav-link">Transaction History </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavPage;