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
            state.userList.sort((a,b)=> a.anime_id - b.anime_id)
        },
        addToUserList:(state,action)=>{
            state.userList.sort((a,b)=> a.anime_id - b.anime_id)
            state.userList.push(action.payload)
        },
        removeFromUserList:(state,action)=>{
            state.userList = state.userList.filter(anime => anime.anime_id !== action.payload)
        },
        updateUserList:(state,action)=>{
            let left = 0;
            let right = state.userList.length - 1;
            while(left <= right){
                const mid = Math.floor((left + right) / 2);
                const midId = state.userList[mid].anime_id;
                if(midId < action.payload.anime_id) left = mid + 1;
                else if(midId > action.payload.anime_id) right = mid - 1;
                else {
                    const anime = state.userList[mid];
                    anime.rating = action.payload.rating;
                    anime.status = action.payload.status;
                    return;
                }
            }
        }
    }
})

export const {fillTrendingList,fillUserList,addToUserList,removeFromUserList,updateUserList} = animeSlice.actions;
export default animeSlice.reducer; 