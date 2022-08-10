import {createAsyncThunk,getDefaultMiddleware, createSlice} from '@reduxjs/toolkit';
import axios from '../../api/api-handler';
const initialState = {email:null, password:null};
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signedUp: (state,action)=>{
            state.user.email = action.payload.email;
            state.user.password = action.payload.password
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchSignUp.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        });
        builder.addCase(fetchSignUp.pending, (state, actions) => {
            state.status = 'loading';

        });
        builder.addCase(fetchSignUp.rejected, (state,actions)=>{
            state.status = 'error';
            state.user = 'dadsdas'
        })
    }
});
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export const {signedUp} = userSlice.actions;
export const getUserInfo = (state)=> state;

//async thunks
export const fetchSignUp  = createAsyncThunk('user/register', async(data,thunkApi)=>{
    try {
        const user = await axios.post('/api/registerUser', data)
        return user
    }catch (e) {
        console.log(e.response)
        //TODO:a page with error like NotFound
        return e.response
    }
});

export const fetchSignIn = createAsyncThunk('user/login' , async(data,thunkApi)=>{
    try{
        const user = await axios.post('/api/loginUser' , data);
        console.log(user)
        return user;
    }catch (e) {
        //TODO:a page with error like NotFound
        return e.response;
    }
});


export const fetchGoogleAuth = createAsyncThunk('user/googleAuth',async(data)=>{
    try{
        console.log("retch google auth")
        const user = await axios.post('/api/api/v1/auth/google',data);
        console.log(user)
        return user;
    }catch (e) {
        return e.response;
    }
})

export default userSlice.reducer;