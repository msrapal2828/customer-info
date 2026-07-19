import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

import { FaEye, FaEdit, FaTrash, FaUsers } from "react-icons/fa";

import "../styles/Customers.css";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {

            const response = await api.get("customers.php");

            setCustomers(response.data.data || []);

        } catch (error) {

            console.log(error);

        }
    };

    const deleteCustomer = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) return;

        try {

            const formData = new FormData();

            formData.append("id", id);

            const response = await api.post(
                "deleteCustomer.php",
                formData
            );

            alert(response.data.data);

            loadCustomers();

        } catch (error) {

            console.log(error);

        }

    };

    const filteredCustomers = customers.filter((customer) =>
        customer.fullname.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <>
            <Sidebar />

            <div
                className="container-fluid py-4 px-4"
                style={{
                    marginLeft: "250px",
                    width: "calc(100% - 250px)"
                }}
            >

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">
                        <FaUsers className="me-2 text-primary" />
                        Customers
                    </h2>

                    <Link to="/add-customer">

                        <button className="btn btn-success">
                            + Add Customer
                        </button>

                    </Link>

                </div>

                <div className="mb-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Search Customer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="table-responsive shadow rounded">

                    <table className="table table-hover table-bordered align-middle text-center mb-0">

                        <thead className="table-dark">

                            <tr>

                                <th style={{ width: "70px" }}>ID</th>
                                <th>Full Name</th>
                                <th style={{ width: "180px" }}>Contact</th>
                                <th style={{ width: "180px" }}>Bouquet</th>
                                <th style={{ width: "140px" }}>Status</th>
                                <th style={{ width: "180px" }}>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredCustomers.length > 0 ? (

                                filteredCustomers.map((customer) => (

                                    <tr key={customer.id}>

                                        <td>{customer.id}</td>

                                        <td>{customer.fullname}</td>

                                        <td>{customer.contact}</td>

                                        <td>{customer.bouquet_type}</td>

                                        <td>

                                            {customer.status === "Pending" && (
                                                <span className="badge bg-warning text-dark">
                                                    Pending
                                                </span>
                                            )}

                                            {customer.status === "Completed" && (
                                                <span className="badge bg-success">
                                                    Completed
                                                </span>
                                            )}

                                            {customer.status === "Cancelled" && (
                                                <span className="badge bg-danger">
                                                    Cancelled
                                                </span>
                                            )}

                                        </td>

                                        <td className="text-nowrap">

                                            <Link
                                                to={`/view-customer/${customer.id}`}
                                                className="btn btn-info btn-sm me-1"
                                                title="View"
                                            >
                                                <FaEye />
                                            </Link>

                                            <Link
                                                to={`/edit-customer/${customer.id}`}
                                                className="btn btn-warning btn-sm me-1"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </Link>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                title="Delete"
                                                onClick={() => deleteCustomer(customer.id)}
                                            >
                                                <FaTrash />
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="6">

                                        No customers found.

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

export default Customers;