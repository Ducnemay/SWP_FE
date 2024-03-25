import React, { Fragment } from "react";
import "./RoleLayout.css"
import { Outlet } from "react-router-dom";
import ManageNavbar from "../navbar/ManageNavBar";
import SideNav from "../sidenav/SideNav";
import SearchBar from "../search/SearchBar";

const RoleLayout = () => {
    return (
        <Fragment>
            <ManageNavbar className="layout-manage-navbar" />
            <SideNav />
            <div id="content-role-page">
                <div className="content-role-page-search">
                    <SearchBar />
                </div>
                <div className="content-outlet-role-page">
                    <Outlet />
                </div>
            </div>
        </Fragment>
    )
}

export default RoleLayout;