import React, { Fragment } from "react";
import "./Layout.css"
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";


const Layout = () => {
    return (
        <Fragment>
            <NavBar className="layout-navbar" />
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