import {useEffect, useState} from "react";






const useInput = (initValue,validations)=>{
    const [value,setValue] = useState(initValue)
    const [isDirty, setDirty] = useState(false)
    const [passwordsAreEqual, setPasswordsAreEqual] = useState(false)
    const [errors , setErrors] = useState([]);
    // const [isEmpty, setEmpty] = useState(false)
    const valid = useValidation(value,validations)

    const onChange=(e)=>{
        setValue(e.target.value)
        alert(value)
        console.log(value)
    }
    const onBlur=(e)=>{
        setDirty(true)
        console.log(value)
    }

    return{
        value,
        onChange,
        onBlur,
        ...valid,
        isDirty,
        passwordsAreEqual
    }
}



const useValidation = (value,validations)=>{
    const [isEmpty , setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError]= useState(false)
    const [emailError, setEmailError] = useState(false)
    const [errors , setErrors] = useState([]);


    useEffect( ()=>{
        console.log("ЗАПУСТИЛ ХУК")
        for(const validation in validations) {
            switch (validation) {
                case 'minLength' :
                    value.length < validations[validation] ? (setMinLengthError(true)): setMinLengthError(false)
                    break
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break
                case 'emailError':
                    (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? setEmailError(false) :setEmailError(true)
                    break
            }
        }
    },[value])
    return {
        isEmpty,
        maxLengthError,
        minLengthError,
        emailError,
    }
}




export {useValidation,useInput}