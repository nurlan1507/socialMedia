import axios from 'axios';

const config = axios.create({
    baseURL:'http://localhost:8080',
    headers:{
        "Authorization" : localStorage.getItem('accessToken'),
    }
})

export default config