import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:'',
    password:'',
    accessToken:'',
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser(state,action) {
            state.id = action.payload.id;
            state.password = action.payload.password;
            state.accessToken = action.payload.accessToken;
        }
    },
})

// export const { setUser } = userSlice.actions;
// export const selectUser = state => state.user;

export default userSlice