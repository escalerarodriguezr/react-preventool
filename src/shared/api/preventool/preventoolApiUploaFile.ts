import axios from 'axios';
import {getEnv} from "../../utils/getEnv";

const preventoolApiUploadFile = axios.create({
    baseURL: getEnv().VITE_API_PREVENTOOL_URL
});


preventoolApiUploadFile.interceptors.request.use( config => {

    // @ts-ignore
    config.headers = {
        ...config.headers,
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "multipart/form-data"
    }

    return config;
});

export default preventoolApiUploadFile;

