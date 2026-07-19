import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    FaHome,
    FaUsers,
    FaPlusCircle,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";
import { PiFlowerLotusBold } from "react-icons/pi";

import "../styles/Sidebar.css";

function Sidebar() {

    const location = useLocation();
    const [open, setOpen] = useState(false);

    return (

        <>

            {/* Mobile Menu Button */}

            <button
                className="menu-btn"
                onClick={() => setOpen(!open)}
            >

                {open ? <FaTimes /> : <FaBars />}

            </button>

            {/* Overlay */}

            {open && (

                <div
                    className="sidebar-overlay"
                    onClick={() => setOpen(false)}
                ></div>

            )}

            {/* Sidebar */}

            <aside className={`sidebar ${open ? "active" : ""}`}>

                <div className="sidebar-logo">

                    <div className="logo-icon">

                        <PiFlowerLotusBold />

                    </div>

                    <div>

                        <h2>Sanflora</h2>

                        <span>Customer Information System</span>

                    </div>

                </div>

                <nav className="sidebar-menu">

                    <Link
                        to="/dashboard"
                        className={location.pathname === "/dashboard" ? "active" : ""}
                        onClick={() => setOpen(false)}
                    >

                        <FaHome />

                        <span>Dashboard</span>

                    </Link>

                    <Link
                        to="/customers"
                        className={location.pathname === "/customers" ? "active" : ""}
                        onClick={() => setOpen(false)}
                    >

                        <FaUsers />

                        <span>Customers</span>

                    </Link>

                    <Link
                        to="/add-customer"
                        className={location.pathname === "/add-customer" ? "active" : ""}
                        onClick={() => setOpen(false)}
                    >

                        <FaPlusCircle />

                        <span>Add Customer</span>

                    </Link>

                </nav>

                <div className="sidebar-footer">

                    <div className="admin-box">

                        <div className="admin-avatar">
    <FaUserCircle />
</div>

                        <div>
                            <h4>Administrator</h4>
                        </div>

                    </div>

                    <Link
                        to="/"
                        className="logout"
                        onClick={() => setOpen(false)}
                    >

                        <FaSignOutAlt />

                        <span>Logout</span>

                    </Link>

                </div>

            </aside>

        </>

    );

}

export default Sidebar;