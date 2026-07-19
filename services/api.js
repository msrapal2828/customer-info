import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/WST/my-portfolio/server/api/"
});

export default api;