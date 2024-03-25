import React, { useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  SubNav,
  SubNavItem,
} from "./NavbarElements.jsx";
import "./ManageNavBar.css";
import { FaShoppingCart, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import SearchBar from "../search/SearchBar.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import { Link } from "react-router-dom";

const ManageNavbar = ({ className }) => {
  const [showSubNav, setShowSubNav] = useState(false);

  const handleImgClick = () => {
    setShowSubNav(!showSubNav);
  };

  const { auth } = useAuth();

  const Logout = () => {
    localStorage.clear();
    auth.user = null;
  };

  {
    /* admin */
  }
  if (auth?.user?.roleId === "1") {
    return (
      <nav className={`manage-navbar ${className}`}>
        <Nav id="manage-navbar">
          <Bars />
          <div id="logo">
            <Link to="/admin-page">
              <img src="/bcs-icon.png" alt="bcs-logo" />
            </Link>
          </div>
          <NavMenu className="first-role-section">
            <NavLink
              to="/manage-account"
              className="first-section-component-admin"
            >
              Quản lí tài khoản
            </NavLink>
          </NavMenu>
          <div className="second-role-section">
            <p className="manage-navbar-user-name">Xin chao</p>
            <NavLink>
              <img
                src="/chaomao.png"
                alt=""
                className="manage-navbar-user-img"
                onClick={handleImgClick}
              />
              {showSubNav && (
                <div className="manage-navbar-user-img-subnav">
                  <SubNavItem
                    to="/update-info"
                    className="manage-navbar-user-img-subnav-link"
                  >
                    <FaUserEdit /> Chỉnh sửa thông tin
                  </SubNavItem>
                  <SubNavItem
                    to="/home"
                    className="manage-navbar-user-img-subnav-link"
                    onClick={Logout}
                  >
                    <FaSignOutAlt /> Đăng xuất
                  </SubNavItem>
                </div>
              )}
            </NavLink>
          </div>
        </Nav>
      </nav>
    );
  }

  {
    /* manager */
  }
  if (auth?.user?.roleId === "2") {
    return (
      <nav className={`manage-navbar ${className}`}>
        <Nav id="manage-navbar">
          <Bars />
          <div id="logo">
            <Link to="/admin-page">
              <img src="/bcs-icon.png" alt="bcs-logo" />
            </Link>
          </div>
          <NavMenu className="first-role-section">
            <NavLink
              to="/product/view-product"
              className="first-section-component-manager"
            >
              Quản lí sản phẩm
            </NavLink>
            <NavLink
              to="/voucher/view-voucher"
              className="first-section-component-manager"
            >
              Quản lí voucher
            </NavLink>
          </NavMenu>
          <div className="second-role-section">
            <p className="manage-navbar-user-name">Xin chao</p>
            <NavLink>
              <img
                src="/chaomao.png"
                alt=""
                className="manage-navbar-user-img"
                onClick={handleImgClick}
              />
              {showSubNav && (
                <div className="manage-navbar-user-img-subnav">
                  <SubNavItem
                    to="/update-info"
                    className="manage-navbar-user-img-subnav-link"
                  >
                    <FaUserEdit /> Chỉnh sửa thông tin
                  </SubNavItem>
                  <SubNavItem
                    to="/home"
                    className="manage-navbar-user-img-subnav-link"
                    onClick={Logout}
                  >
                    <FaSignOutAlt /> Đăng xuất
                  </SubNavItem>
                </div>
              )}
            </NavLink>
          </div>
        </Nav>
      </nav>
    );
  }

  //staff
  else {
    return (
      <nav className={`manage-navbar ${className}`}>
        <Nav id="manage-navbar">
          <Bars />
          <div id="logo">
            <a href="/home">
              <img src="/bcs-icon.png" alt="bcs-logo" />
            </a>
          </div>
          <NavMenu className="first-role-section">
            <NavLink to="/blogs" className="first-section-component-staff">
              Quản lí bài viết
            </NavLink>
            <NavLink to="/feedback" className="first-section-component-staff">
              Quản lí feedback
            </NavLink>
            <NavLink to="/order" className="first-section-component-staff">
              Quản lí đơn hàng
            </NavLink>
          </NavMenu>

          <div className="second-role-section">
            <p className="manage-navbar-user-name">Xin chao</p>
            <NavLink>
              <img
                src="/chaomao.png"
                alt=""
                className="manage-navbar-user-img"
                onClick={handleImgClick}
              />

              {showSubNav && (
                <div className="manage-navbar-user-img-subnav">
                  <SubNavItem
                    to="/update-info"
                    className="manage-navbar-user-img-subnav-link"
                  >
                    <FaUserEdit /> Chỉnh sửa thông tin
                  </SubNavItem>
                  <SubNavItem
                    to="/home"
                    className="manage-navbar-user-img-subnav-link"
                    onClick={Logout}
                  >
                    <FaSignOutAlt /> Đăng xuất
                  </SubNavItem>
                </div>
              )}
            </NavLink>
          </div>
        </Nav>
      </nav>
    );
  }
};

export default ManageNavbar;
