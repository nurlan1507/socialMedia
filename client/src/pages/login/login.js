import React, {useEffect, useState} from 'react';
import {useDispatch , useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from './login.module.css';
import {fetchGoogleAuth, fetchSignIn} from "../../features/userAuth/userSlice";

import {gapi} from "gapi-script";
import {GoogleLogin} from 'react-google-login';


export const Login = () => {
    useEffect(()=>{
        function start(){
            gapi.client.init({
                clientId:'143981641129-35qob5hkpmehsl1d32p3kmsnkltt1u99.apps.googleusercontent.com',
                scope:""
            })
        }
    })



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [signInRequestStatus , setSignInRequestStatus] = useState('idle');


    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);

    const onLoginClicked = async() => {
        setSignInRequestStatus('pending');
        const result = await dispatch(fetchSignIn({email:email, password:password}));
        console.log(result.payload.data)
        if(result.status!==200){
            console.log(result.payload.data)
            setError(result.payload.data.msg)
            return
        }
        navigate('/main')
    };
    const handleGoogleLogin =(response)=>{
        console.log(response)
        if(response.error!==undefined){
            console.log(`${response.error}`);
            console.log('adsdsa')
            return false
        }else{
            console.log(response)
            return response
        }
    }

    const onGoogleAuthClicked = async()=>{
        setSignInRequestStatus('pending');
        console.log('asdasdasdasdasdasdd')
        const result = await dispatch(fetchGoogleAuth);
        if(result.status!==200){
            console.log(result)
            return
        }
        navigate('/main')
    }

    return(
        <div>
            <div className={styles.container}>
                <form>
                    {error && <div style={{color:"red"}}> {error}</div>}
                    <h2 className={styles.formHeader}>Sign In</h2>
                    <p className={styles.formText}>Sign in and start managing your digital life!</p>
                    <div className={styles.inputCont}>
                        <input type={'text'}  id={'email'} value={email} className={styles.formInput} placeholder={'email'} onChange={(e)=>{onEmailChange(e)}}/>
                    </div>
                    <div className={styles.inputCont}>
                        <input type={'text'}  id={'password'} value={password} className={styles.formInput} placeholder={'password'} onChange={(e)=>{onPasswordChange(e)}}/>
                    </div>

                    <GoogleLogin
                        clientId={"143981641129-35qob5hkpmehsl1d32p3kmsnkltt1u99.apps.googleusercontent.com"}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                        )}
                        buttonText="Login"
                        onSuccess={handleGoogleLogin}
                        onFailure={handleGoogleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                    <button className={styles.signUp} type={'button'} onClick={()=> {
                        onLoginClicked()
                    }}>Sign in</button>

                </form>
            </div>

            <div className={styles.ocean}>
                <div className={styles.wave}/>
                <div className={styles.wave}/>
                <div className={styles.wave}/>
            </div>
        </div>
    )
}