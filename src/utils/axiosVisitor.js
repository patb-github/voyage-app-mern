import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PROD_URL = import.meta.env.VITE_PROD_URL;

// create an axios instance
const axiosVisitor = axios.create({
    baseURL: BASE_URL || PROD_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// export the configured axios instance 
export default axiosVisitor;