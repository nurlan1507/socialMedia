import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import './sign_up.css';
import {signedUp, fetchSignUp} from "../../features/userAuth/userSlice";



export const SignUp=()=>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState('', );
    const [firstName , setFirstName] = useState('');
    const [secondName, setSecondName] = useState('',);
    const [password, setPassword] = useState('',);
    const [repeat_password, setRepeat_password] = useState('');
    const [errors, setErrors] = useState('');
    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);
    const onRepeatPasswordChange = e => setRepeat_password(e.target.value);
    const onFirstNameChange = e => setFirstName(e.target.value);
    const onSecondNameChange = e => setSecondName(e.target.value);
    const [signUpRequestStatus ,setSignUpRequestStatus] = useState('idle');

    const navigate = useNavigate();



    const onSignUpClicked =async()=>{
        try{
            setSignUpRequestStatus('pending');
            const result = await dispatch(fetchSignUp({email:email,password:password,repeat_password:repeat_password, firstName:firstName,secondName:secondName})).unwrap();
            if(result.status !== 200){
                if(result.data.errors)
                setErrors(result.data.errors)
                else{
                    console.log(result.data)
                    setErrors(result.data)
                }
            }
            if(result.status ===200)
               navigate('/main')
        }catch (e){
            console.log(e.response);
        }finally {
            setSignUpRequestStatus('idle');
        }
    }

    return(
        <div>
        <div className={'container'}>
            <form>
                {errors && errors.map((item)=>(
                    <div style={{color:"red"}}>{item.msg}</div>
                ))}
                <h2 className={'form-header'}>Sign up</h2>
                <p className={'form-text'}>Sign up and start your digital life</p>
                    <div className={'input-cont'}>
                        <input type={'text'}  id={'email'} value={email} className={'form-input'} placeholder={'email'} onChange={(e)=>{onEmailChange(e)}}/>
                    </div>
                        <div className={'input-cont input-cont-double'}>
                            <input type={'text'} id={'firstname'} value={firstName} className={'form-input form-input-name'} placeholder={'firstname'} onChange={(e)=>{onFirstNameChange(e)}}/>
                            <input type={'text'} id={'secondname'} value={secondName} className={'form-input form-input-name'} placeholder={'secondname'} onChange={(e)=>{onSecondNameChange(e)}}/>
                        </div>
                    <div className={'input-cont'}>
                        <input type={'text'}  id={'password'} value={password} className={'form-input'} placeholder={'password'} onChange={(e)=>{onPasswordChange(e)}}/>
                    </div>
                    <div  className={'input-cont'}>
                        <input type={'text'} id={'confirmPassword'} value={repeat_password} className={'form-input'} placeholder={'Repeat password'} onChange={(e)=>{onRepeatPasswordChange(e)}}/>
                    </div>
                    <button className={'sign_up'} type={'button'} onClick={()=> {
                        console.log('button lciked')
                        onSignUpClicked()
                    }}>register</button>
                </form>
            <div className={'footer'}>
                <img src={require('../../public/signUpFooter.png')} style={{width:"100%"}} alt={'footer_image'}/>
            </div>
            </div>


    </div>
    )



}