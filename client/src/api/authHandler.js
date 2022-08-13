import jwtDecode from "jwt-decode";

export const decodeToken=()=> {
    console.log(localStorage.getItem('accessToken'))
    const payload = jwtDecode(localStorage.getItem('accessToken'));
    console.log(payload)
    return payload;
}

