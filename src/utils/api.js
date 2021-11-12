import axios from 'axios';
import {BASE_URL, PREFIX } from "./constants";
import {getTokenObject} from "./utils";
import { success, error as errorFunc } from './message';


export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

api.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
        let token = getTokenObject()
        if (token) {
            config.headers.Authorization = `Bearer ${token.Authorization}`;
        }
    }

    // refreshToken()

    return config;
}, error => Promise.reject(error));


api.interceptors.response.use((response) => {
    if (response.status === 201){
        let responseMessage = response.data.message ? response.data.message : undefined
        success(responseMessage)
    }
    return response
}, async function (error) {
    // const originalRequest = error.config;

    if (error.response.config.method === "get" && String(error.response.config.url).startsWith("/Registration")){

    } else {
        let errorMessage = error.response.data.message ? error.response.data.message : (error.response.status === 403 ? "دسترسی شما امکان پذیر نمی باشد" : undefined )
        errorFunc(errorMessage)
    }

    if (error.response.status === 401) {
        window.location.href = `${PREFIX}/login`
    }
return Promise.reject(error);
});

