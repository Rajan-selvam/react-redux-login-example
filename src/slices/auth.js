import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
import { setMessage } from "./message";

let user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
    "auth/register",
    async({username,email,password},thunkAPI) => {
        try{
            const response = await AuthService.register(username,email,password);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        }catch(error){
            const message = (error.response &&
                 error.response.data &&
                 error.response.data.message) || error.message || error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);
export const login = createAsyncThunk(
    "auth/Login",
    async({username,password},thunkAPI) => {
        try{
            const data = await AuthService.login(username,password);
            return { user : data };
        }catch(error){
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) || error.message || error.toString();
           thunkAPI.dispatch(setMessage(message));
           return thunkAPI.rejectWithValue();
        }
    }
);
export const logout = createAsyncThunk("auth/logout",async()=>await AuthService.logout());

const initialState = user ? {isLoggedIn : true, user} : {isLoggedIn : false, user : null} ;

const authSlice = createSlice({
    name:"auth",
    initialState,
    extraReducers : {
        [register.fulfilled] : (state,action) => {
            state.isLoggedIn = false;
        },
        [register.rejected] : (state,action) => {
            state.isLoggedIn = false;
        },
        [login.fulfilled] : (state) => {
            // state.isLoggedIn = true;
        },
        [login.rejected] : (state,action) => {
            state.isLoggedIn = false;
        },
        [logout.fulfilled] : (state,action) => {
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice;