import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
// import { setMessage } from "./message";

const initialState = {
    item : [],
    totalQty : 0,
    totalAmount : 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        
    }
});

export default cartSlice;