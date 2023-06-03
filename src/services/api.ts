import axios from "axios";
const api = axios.create({
    baseURL: "https://feedback-api-1804.onrender.com"
})

export default api;