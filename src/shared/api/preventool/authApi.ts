import axios from 'axios';
import {getEnv} from "../../utils/getEnv";


export const authApi = axios.create({
    baseURL: getEnv().VITE_API_AUTH_URL
});

