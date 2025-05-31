import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "./animeSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer : {
        anime : animeReducer,
        auth : authReducer
    }
})

export default store;