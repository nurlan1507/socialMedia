import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userSliceReducer from './features/userAuth/userSlice';
import {applyMiddleware, compose} from 'redux'
import {logger} from './features/middlewares/redux_middlewares'



const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});




export default configureStore({
    reducer: {
        user: userSliceReducer,
    },
    middleware
})