import jwtDecode from "jwt-decode";

export const decodeToken=()=>{
    const payload = jwtDecode(localStorage.getItem('accessToken'));
    return {...payload};
}