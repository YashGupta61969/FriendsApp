import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
    currentUser:{}
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
        }
    },
})

export default usersSlice.reducer

export const {addUsers, addCurrentUser} = usersSlice.actions