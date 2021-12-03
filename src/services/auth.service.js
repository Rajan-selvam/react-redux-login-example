import axios from "axios";

const API_URL = "http://http://localhost:8080/api/auth/";

const register = (username,email,password) => {
    return axios.post(API_URL+"signup",
    {username,email,password})
    .then(response => {
        console.log(response);
    });
};

const login = (username,password) => {
    return axios.post(API_URL+"signin",
    {username,password})
    .then(response=>{
        if(response.data.accessToken){
            localStorage.setItem("user",JSON.stringify(response.data));
        }
        return response.data;
    });
}

const logout = () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    login,
    logout
};

export default authService;