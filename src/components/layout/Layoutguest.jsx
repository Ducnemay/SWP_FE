import React, { Fragment } from "react";
import "./Layout.css"
import Navbarguest from "../navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";


const Layout = () => {
    return (
        <Fragment>
            <Navbarguest className="layout-navbar" />
            <div id="content">
                <div className="content-outlet">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default Layout;