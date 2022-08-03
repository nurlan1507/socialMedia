import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUserInfo} from "../../features/userAuth/userSlice";
import './sign_up.css';


export const SignUp=()=>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [repeat_password, setRepeat_password] = useState();




    return(
        <div>
        <div className={'container'}>
            <form>
                <h2 className={'form-header'}>Sign up</h2>
                <p className={'form-text'}>Sign up and start your digital life</p>
                    <div className={'input-cont'}>
                        <input type={'text'}  id={'email'} className={'form-input'} placeholder={'email'}/>
                    </div>
                        <div className={'input-cont input-cont-double'}>
                            <input type={'text'} id={'firstname'} className={'form-input form-input-name'} placeholder={'firstname'}/>
                            <input type={'text'} id={'secondname'} className={'form-input form-input-name'} placeholder={'secondname'}/>
                        </div>
                    <div className={'input-cont'}>
                        <input type={'text'}  id={'password'} className={'form-input'} placeholder={'password'}/>
                    </div>
                    <div  className={'input-cont'}>
                        <input type={'text'} id={'confirmPassword'} className={'form-input'} placeholder={'Repeat password'}/>
                    </div>
                    <button className={'sign_up'}>register</button>
                </form>
            <div className={'footer'}>
                <img src={require('../../public/signUpFooter.png')} style={{width:"100%"}} alt={'footer_image'}/>
            </div>
            </div>


    </div>
    )



}