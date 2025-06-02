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
        },
        addToUserList(state,action){
            state.userList.push(action.payload)
        }

    }
})

export const {fillTrendingList,fillUserList,addToUserList} = animeSlice.actions;
export default animeSlice.reducer; 