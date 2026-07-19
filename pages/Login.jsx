import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";
import {
    FaUserLock,
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import { PiFlowerLotusBold } from "react-icons/pi";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("username", username);
            formData.append("password", password);

            const response = await api.post("login.php", formData);

            console.log("Response:", response.data);

            if (response.data.status) {

                alert("Login Successful!");

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );

                navigate("/dashboard");

            } else {

                alert(response.data.message);

            }

        } catch (error) {

            console.log(error);

            alert("Unable to connect to the server.");

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="logo">
    <PiFlowerLotusBold />
</div>

                <h2 className="login-title">
                    Flower Bouquet
                </h2>

                <p className="login-subtitle">
                    Customer Information System
                </p>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">
                            <FaUser className="me-2" />
                            Username
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            <FaLock className="me-2" />
                            Password
                        </label>

                        <div className="input-group">

                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >

                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}

                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-login"
                    >

                        <FaUserLock className="me-2" />

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;