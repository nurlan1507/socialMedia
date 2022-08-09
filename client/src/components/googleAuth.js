import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from "react-redux";


export default function GoogleAuth (){
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



    return(
        <GoogleLogin
            clientId="143981641129-35qob5hkpmehsl1d32p3kmsnkltt1u99.apps.googleusercontent.com"
            render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
            )}
            buttonText="Login"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={'single_host_origin'}
        />
    )
}