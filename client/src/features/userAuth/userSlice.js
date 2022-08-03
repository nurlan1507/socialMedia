import {createSlice} from '@reduxjs/toolkit';
const initialState = {email:'', password:''};
const userSlice = createSlice({
    name:"userAuth",
   initialState:initialState,
    reducers:{
        signedUp: (state,action)=>{
            state.email = action.payload.email;
            state.password = action.payload.password
        },
    }
});


export const {signedUp} = userSlice.actions;
export const getUserInfo = (state)=> state;

export default userSlice.reducer;