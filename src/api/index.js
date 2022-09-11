import axios from "axios";
import { LOGOUT, SHOW_TOAST } from "../actions/types";

export const apiCall = (config, dispatch) => {
    return new Promise((resolve, reject) => {
        axios({
            method: config.method,
            url: config.url,
            headers: config.headers,
            data: config.data || {},
            timeout: 70000,
        })
            .then(async (response) => {
                resolve(response);
            })

            
            .catch(async (error) => {
                // console.log("eeeeee", error)
                let response = error.response;
                if (response.status === 401) {
                    dispatch({
                        type: LOGOUT,
                    });
                    dispatch({
                        type: SHOW_TOAST,
                        payload: {
                            show: true,
                            type: 'error',
                            text: response.message,
                        },
                    });
                }
                reject(error);
            });
    });
};