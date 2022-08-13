import React, {useEffect, useState} from 'react';
import {useDispatch , useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from './login.module.css';
import {login} from "../../redux/actions/userAction";
import {GoogleLoginComponent} from "../../components/googleLogin/googleLogin";


export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [signInRequestStatus , setSignInRequestStatus] = useState('idle');


    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);

    const onLoginClicked = async() => {
        const result = await dispatch(login({email:email,password:password}));
        if(result.status===200){
            navigate('/');
            return
        }
        setError(result);
        return
    };



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
                    <GoogleLoginComponent/>
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