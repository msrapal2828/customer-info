import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/AddCustomer.css";

function EditCustomer() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        contact: "",
        address: "",
        bouquet_type: "",
        quantity: "",
        event_date: "",
        status: ""
    });

    useEffect(() => {
        loadCustomer();
    }, []);

    const loadCustomer = async () => {

        try {

            const response = await api.get(`customer.php?id=${id}`);

            setForm(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("id", id);
            formData.append("fullname", form.fullname);
            formData.append("contact", form.contact);
            formData.append("address", form.address);
            formData.append("bouquet_type", form.bouquet_type);
            formData.append("quantity", form.quantity);
            formData.append("event_date", form.event_date);
            formData.append("status", form.status);

            const response = await api.post(
                "updateCustomer.php",
                formData
            );

            alert(response.data.data);

            navigate("/customers");

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
                    marginLeft: "250px",
                    width: "calc(100% - 250px)"
                }}
            >

                <div className="card shadow border-0 rounded-4">

                    <div className="card-header bg-warning">

                        <h3 className="mb-0">
                            ✏ Edit Customer
                        </h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        className="form-control"
                                        name="fullname"
                                        value={form.fullname}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Contact
                                    </label>

                                    <input
                                        className="form-control"
                                        name="contact"
                                        value={form.contact}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Address
                                    </label>

                                    <input
                                        className="form-control"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Bouquet Type
                                    </label>

                                    <input
                                        className="form-control"
                                        name="bouquet_type"
                                        value={form.bouquet_type}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Event Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        name="event_date"
                                        value={form.event_date}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-4">

                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                    >
                                        <option>Pending</option>
                                        <option>Completed</option>
                                        <option>Cancelled</option>
                                    </select>

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-warning me-2"
                            >
                                Update Customer
                            </button>

                            <Link
                                to="/customers"
                                className="btn btn-secondary"
                            >
                                Cancel
                            </Link>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}

export default EditCustomer;