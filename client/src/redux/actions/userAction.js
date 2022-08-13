import axios from '../../api/api-handler';
import {globalTypes} from "./globalTypes";
export const login = (data) => async(dispatch)=>{
    try{
        const user = await axios.post('/api/loginUser', data);
        dispatch({type:'user/login', payload:{id:user.data.user.id,email:user.data.user.email, avatar:user.data.user.avatar, firstName:user.data.user.firstName, secondName: user.data.user.secondName}});
        localStorage.setItem('accessToken', user.data.tokens.accessToken);
        return user
    }catch (e) {
        console.log(e)
        return e.response.data
    }
}

export const register = (data)=>async(dispatch)=>{
    try{
        const user = await axios.post('/api/registerUser' , data);
        dispatch({type:'user/register', payload:{id:user.data.user.id,email:user.data.user.email, avatar:user.data.user.avatar, firstName:user.data.user.firstName, secondName: user.data.user.secondName}    })
        localStorage.setItem('accessToken', user.data.tokens.accessToken);
        return user
    }catch (e) {
        console.log(e)
        return e.response.data;
    }
}

export const googleLogin =(data)=>async(dispatch)=>{
    try{
        const user = await axios.post('/api/api/v1/auth/google', data);
        console.log(user.data.user.dataValues)
        dispatch({type:'user/googleAuth' , payload:{id:user.data.user.dataValues.id,email:user.data.user.dataValues.email, avatar:user.data.user.dataValues.avatar, firstName:user.data.user.dataValues.firstName, secondName: user.data.user.dataValues.secondName}});
        localStorage.setItem('accessToken', user.data.tokens.accessToken);
        return user
    }catch (e){
        return e.response.data;
    }
}