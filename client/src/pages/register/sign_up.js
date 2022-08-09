import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import styles from  './sign_up.modules.css';
import {signedUp, fetchSignUp} from "../../features/userAuth/userSlice";
const footer= require('../../assets/footer.png');


export const SignUp=()=>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [firstName , setFirstName] = useState('');
    const [secondName, setSecondName] = useState('',);
    const [password, setPassword] = useState('',);
    const [repeat_password, setRepeat_password] = useState('');
    const [errors, setErrors] = useState('');
    const onEmailChange = e => {setEmail(e.target.value); console.log(email)}
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
            if(result.status ===200) {
                localStorage.setItem("accessToken" , result.data.tokens.accessToken)
                navigate('/main')

            }
        }catch (e){
            console.log(e.response);
        }finally {
            setSignUpRequestStatus('idle');
        }
    }

    return(
        <div>
        <div className={styles.container}>
            <form>
                {errors && errors.map((item)=>(
                    <div style={{color:"red"}}>{item.msg}</div>
                ))}
                <h2 className={styles.formHeader}>Sign up</h2>
                <p className={styles.formText}>Sign up and start your digital life</p>
                    <div className={styles.inputCont}>
                        <input type={'text'}  id={'email'} value={email} className={styles.formInput} placeholder={'email'} onChange={(e)=>{onEmailChange(e)}}/>
                    </div>
                        <div className={`${styles.inputCont} ${styles.inputContDouble}`}>
                            <input type={'text'} id={'firstname'} value={firstName} className={`${styles.formInput} ${styles.formInputName}`} placeholder={'firstname'} onChange={(e)=>{onFirstNameChange(e)}}/>
                            <input type={'text'} id={'secondname'} value={secondName} className={`${styles.formInput} ${styles.formInputName}`} placeholder={'secondname'} onChange={(e)=>{onSecondNameChange(e)}}/>
                        </div>
                    <div className={styles.inputCont}>
                        <input type={'text'}  id={'password'} value={password} className={styles.formInput} placeholder={'password'} onChange={(e)=>{onPasswordChange(e)}}/>
                    </div>
                    <div  className={styles.inputCont}>
                        <input type={'text'} id={'confirmPassword'} value={repeat_password} className={styles.formInput} placeholder={'Repeat password'} onChange={(e)=>{onRepeatPasswordChange(e)}}/>
                    </div>
                    <button className={styles.signUp} type={'button'} onClick={()=> {
                        console.log('button lciked')
                        onSignUpClicked()
                    }}>register</button>
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