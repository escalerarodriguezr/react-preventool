import axios from 'axios';
import {getEnv} from "../../utils/getEnv";

const preventoolApi = axios.create({
    baseURL: getEnv().VITE_API_PREVENTOOL_URL
});


preventoolApi.interceptors.request.use( config => {

    // @ts-ignore
    config.headers = {
        ...config.headers,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    return config;
});

export default preventoolApi;

