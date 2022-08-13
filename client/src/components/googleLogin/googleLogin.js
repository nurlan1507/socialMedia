import React, {useEffect, useState} from 'react'
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";
import {useDispatch} from "react-redux";
import {googleLogin} from "../../redux/actions/userAction";
import {useNavigate} from "react-router-dom";

export const GoogleLoginComponent = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    useEffect(()=>{
        function start(){
            gapi.client.init({
                clientId:'143981641129-35qob5hkpmehsl1d32p3kmsnkltt1u99.apps.googleusercontent.com',
                scope:""
            })
        }
    });


    const handleGoogleLogin = async(response)=>{
        if(response.error!==undefined){
            alert('error occured');
            console.log(response)
            return false;
        }else{
            const result = await dispatch(googleLogin(response));
            console.log(result)
            if(result.status===200){
                navigate('/');
                return true;
            }
            setError(result);
            return false;
        }
    }

    return (
        <>
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
            {error && <div style={{color:'red'}}>error</div> }
        </>
    )
}