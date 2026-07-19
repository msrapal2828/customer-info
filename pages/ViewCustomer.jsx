import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/ViewCustomer.css";

function ViewCustomer() {

    const { id } = useParams();

    const [customer, setCustomer] = useState({});

    useEffect(() => {
        loadCustomer();
    }, []);

    const loadCustomer = async () => {

        try {

            const response = await api.get(`customer.php?id=${id}`);

            setCustomer(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <Sidebar />

            <div
                className="container-fluid py-4 px-4"
                style={{
                    marginLeft:"250px",
                    width:"calc(100% - 250px)"
                }}
            >

                <div className="card shadow border-0 rounded-4">

                    <div className="card-header bg-primary text-white">

                        <h3>
                            👤 Customer Details
                        </h3>

                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="fw-bold">
                                    Full Name
                                </label>

                                <p>{customer.fullname}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="fw-bold">
                                    Contact
                                </label>

                                <p>{customer.contact}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="fw-bold">
                                    Address
                                </label>

                                <p>{customer.address}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="fw-bold">
                                    Bouquet Type
                                </label>

                                <p>{customer.bouquet_type}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="fw-bold">
                                    Quantity
                                </label>

                                <p>{customer.quantity}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="fw-bold">
                                    Event Date
                                </label>

                                <p>{customer.event_date}</p>

                            </div>

                            <div className="col-md-6 mb-4">

                                <label className="fw-bold">
                                    Status
                                </label>

                                <br />

                                {customer.status === "Pending" &&
                                    <span className="badge bg-warning text-dark">
                                        Pending
                                    </span>
                                }

                                {customer.status === "Completed" &&
                                    <span className="badge bg-success">
                                        Completed
                                    </span>
                                }

                                {customer.status === "Cancelled" &&
                                    <span className="badge bg-danger">
                                        Cancelled
                                    </span>
                                }

                            </div>

                        </div>

                        <Link
                            to="/customers"
                            className="btn btn-secondary"
                        >
                            Back
                        </Link>

                    </div>

                </div>

            </div>

        </>

    );

}

export default ViewCustomer;