import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    trendingList : [],
    userList : []
}

const animeSlice = createSlice({
    name : "anime",
    initialState,
    reducers:{
        fillTrendingList:(state,action)=>{
            state.trendingList = action.payload
        },
        fillUserList:(state,action)=>{
            state.userList = action.payload
        }
    }
})

export const {fillTrendingList,fillUserList} = animeSlice.actions;
export default animeSlice.reducer; 