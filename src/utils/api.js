import axios from "axios";

export const base_url = 'http://solidappmaker.ml:5042/api/v1/';
export const file_url = 'http://solidappmaker.ml:5042/files/';

const api = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        console.log(config.url, "Request : ", config)
        return config
    },
    error => Promise.reject(error)
)

api.interceptors.response.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        console.log(config.request.responseURL, "Reesponse : ", config)
        return config
    },
    error => Promise.reject(error)
)

export default api