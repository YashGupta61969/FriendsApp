import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
    currentUser:{},
    selectedUser:{}
}

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{      
        addCurrentUser:(state,{payload})=>{
            state.currentUser = payload;
        },
        addUsers:(state,{payload})=>{
            state.users = payload
        },
        seletUser:(state, {payload})=>{
            state.selectedUser = payload
        }
    },
})

export default usersSlice.reducer

export const {addUsers, addCurrentUser, seletUser} = usersSlice.actions