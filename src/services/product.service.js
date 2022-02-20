import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/v1/";

const getAllProducts = (page_number) => {
    const PAGE_NUMBER = page_number ?? 0;
    return axios.get(API_URL+`products?page=${PAGE_NUMBER}`,{ headers: authHeader() });
}

const getProductDetails = () => {
    return axios.get(API_URL+"product/:id",{ headers: authHeader() });
}

const productService = {
    getAllProducts,
    getProductDetails
}

export default productService;