import {decodeToken} from "../../api/authHandler";

const initialState = decodeToken();

export const getUserData = state => state.userReducer;

export const userReducer= (state= initialState, action)=>{
    switch (action.type){
        case 'user/register':
            return action.payload;
        case 'user/login':
            return action.payload;
        case 'user/googleAuth':
            return action.payload;
        default:
            return state;
    }
}