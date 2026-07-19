import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import "../styles/AddCustomer.css";

function AddCustomer() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        contact: "",
        address: "",
        bouquet_type: "",
        quantity: "",
        event_date: "",
        status: "Pending"
    });

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

            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

           const response = await api.post(
    "addCustomer.php",
    formData
);

if (response.data.status) {
    alert(response.data.data);
    navigate("/customers");
} else {
    alert(response.data.message);
}

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

                    <div className="card-header bg-success text-white">

                        <h3 className="mb-0">
                            Add New Customer
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
                                        type="text"
                                        className="form-control"
                                        name="fullname"
                                        value={form.fullname}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Contact Number
                                    </label>

                                    <input
                                    type="text"
                                    className="form-control"
                                    name="contact"
                                    value={form.contact}
                                    onChange={handleChange}
                                    maxLength={11}
                                    pattern="09[0-9]{9}"
                                    title="Contact number must start with 09 and contain exactly 11 digits."
                                    required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                   <label className="form-label">
    Bouquet Type
</label>

<select
    className="form-select"
    name="bouquet_type"
    value={form.bouquet_type}
    onChange={handleChange}
    required
>
    <option value="">-- Select Bouquet Type --</option>
    <option value="Rose Bouquet">Rose Bouquet</option>
    <option value="Sunflower Bouquet">Sunflower Bouquet</option>
    <option value="Tulip Bouquet">Tulip Bouquet</option>
    <option value="Mixed Flower Bouquet">Mixed Flower Bouquet</option>
    <option value="Baby's Breath Bouquet">Baby's Breath Bouquet</option>
    <option value="Customized Bouquet">Customized Bouquet</option>
</select>

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
                                   min="1"
                                   required
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
                                    min={new Date().toISOString().split("T")[0]}
                                    required
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
                                className="btn btn-success me-2"
                            >
                                Save Customer
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

export default AddCustomer;