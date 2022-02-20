import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import messageSlice from "./message";
import cartSlice from "./cart";

const reducer = {
    auth : authSlice.reducer,
    message : messageSlice.reducer,
    cart : cartSlice.reducer
}

const store = configureStore({
    reducer : reducer,
    devTools : true
});

export default store;