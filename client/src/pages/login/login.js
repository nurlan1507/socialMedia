import React, {useState} from 'react';
import {useDispatch , useSelector} from "react-redux";
import styles from './login.module.css';

export const Login = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');



    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);

    const onLoginClicked = async() => {
        const result = await dispatch({email:email, password:password});
        if(result.status!==200){
            console.log(result.data)
            setError(result.data.msg)
        }
    }

    return(
        <div>
            <div className={'container'}>
                <form>
                    {error && <div style={{color:"red"}}> {error}</div>}
                    <h2 className={'form-header'}>Sign In</h2>
                    <p className={'form-text'}>Sign in and start managing your digital life!</p>
                    <div className={'input-cont'}>
                        <input type={'text'}  id={'email'} value={email} className={'form-input'} placeholder={'email'} onChange={(e)=>{onEmailChange(e)}}/>
                    </div>
                    <div className={'input-cont'}>
                        <input type={'text'}  id={'password'} value={password} className={'form-input'} placeholder={'password'} onChange={(e)=>{onPasswordChange(e)}}/>
                    </div>
                    <button className={'sign_up'} type={'button'} onClick={()=> {
                        console.log('button lciked')
                    }}>Sign in</button>
                </form>
                <div className={'footer'}>

                </div>
            </div>
        </div>
    )
}