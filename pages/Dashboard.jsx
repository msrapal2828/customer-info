import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

import {
    FaUsers,
    FaClipboardList,
    FaCheckCircle,
    FaTimesCircle,
    FaPlus,
    FaEye
} from "react-icons/fa";

import "../styles/Dashboard.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
    totalCustomers: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
    recentCustomers: []
});

    const [dateTime, setDateTime] = useState("");

    useEffect(() => {

        loadDashboard();

        const timer = setInterval(() => {

            const now = new Date();

            setDateTime(
                now.toLocaleString("en-PH", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })
            );

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const loadDashboard = async () => {

    try {

        const response = await api.get("dashboard.php");

        setDashboard({
            totalCustomers: response.data.data.totalCustomers,
            pending: response.data.data.pending,
            completed: response.data.data.completed,
            cancelled: response.data.data.cancelled,
            recentCustomers: response.data.data.recentCustomers || []
        });

    } catch (error) {

        console.log(error);

    }

};

    return (

        <>
            <Sidebar />

            <div
                className="dashboard-container"
            >

                {/* Header */}

                <div className="dashboard-header">

    <div className="header-content">

        <span className="dashboard-label">
  
        </span>

        <h1>
            Sanflora Flower Shop
        </h1>

        <p>
            Dashboard Overview
        </p>

        <small>{dateTime}</small>

    </div>

</div>

                {/* Cards */}

                <div className="dashboard-cards">

                    <div className="info-card">

                        <div className="icon pink">

                            <FaUsers />

                        </div>

                        <div>

                            <h3>{dashboard.totalCustomers}</h3>

                            <span>Total Customers</span>

                        </div>

                    </div>

                    <div className="info-card">

                        <div className="icon yellow">

                            <FaClipboardList />

                        </div>

                        <div>

                            <h3>{dashboard.pending}</h3>

                            <span>Pending Orders</span>

                        </div>

                    </div>

                    <div className="info-card">

                        <div className="icon green">

                            <FaCheckCircle />

                        </div>

                        <div>

                            <h3>{dashboard.completed}</h3>

                            <span>Completed Orders</span>

                        </div>

                    </div>

                    <div className="info-card">

                        <div className="icon red">

                            <FaTimesCircle />

                        </div>

                        <div>

                            <h3>{dashboard.cancelled}</h3>

                            <span>Cancelled Orders</span>

                        </div>

                    </div>

                </div>

                {/* Quick Actions */}

                <div className="quick-actions">

                    <h3>
                        Quick Actions
                    </h3>

                    <div className="action-buttons">

                        <Link to="/add-customer">

                            <button className="pink-btn">

                                <FaPlus />

                                Add Customer

                            </button>

                        </Link>

                        <Link to="/customers">

                            <button className="outline-btn">

                                <FaEye />

                                View Customers

                            </button>

                        </Link>

                    </div>

                </div>

                <div className="recent-customers">

    <div className="table-header">

        <h3>Recent Customers</h3>

        <Link to="/customers">

            View All

        </Link>

    </div>

    <table className="table">

        <thead>

            <tr>

                <th>Customer</th>

                <th>Bouquet</th>

                <th>Event Date</th>

                <th>Status</th>

            </tr>

        </thead>

        <tbody>

            {dashboard.recentCustomers.length > 0 ? (

                dashboard.recentCustomers.map((customer, index) => (

                    <tr key={index}>

                        <td>{customer.fullname}</td>

                        <td>{customer.bouquet_type}</td>

                        <td>{customer.event_date}</td>

                        <td>

                            <span
                                className={`status ${customer.status.toLowerCase()}`}
                            >

                                {customer.status}

                            </span>

                        </td>

                    </tr>

                ))

            ) : (

                <tr>

                    <td colSpan="4" className="text-center">

                        No customer records found.

                    </td>

                </tr>

            )}

        </tbody>

    </table>

</div>

                
            </div>

        </>

    );

}

export default Dashboard;