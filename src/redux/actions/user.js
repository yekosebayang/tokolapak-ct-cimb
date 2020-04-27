// disini yang nentuin apa yang dikirim ke global state
import Axios from 'axios'
import { API_URL } from '../../constants/API'
import userTypes from '../types/user'

const {ON_LOGIN_SUCCESS,ON_LOGIN_FAILED,ON_LOGOUT_SUCCES} = userTypes;

export const loginHandler = (userData) => {
    return (dispatch) => { // anggap dispatch = return
        const {username, password} = userData
        Axios.get(`${API_URL}users` ,{
            params: {
                username,//kalo sama namanya, disatuin aja,
                password,//seperti ini
            }
        })
        .then(res => {
            console.log(res)
            if (res.data.length>0){
                dispatch({
                    type: "ON_LOGIN_SUCCESS",
                    payload: res.data[0]
                })
            }
            else {
                dispatch({
                    type: "ON_LOGIN_FAIL",
                    payload: "Username atau password salah"
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const registerHandler = (userData) => {
    return (dispatch) => { // anggap dispatch = return
        Axios.get(`${API_URL}users`, {
            params: {
              username: userData.username,
            },
        })
        .then((res) => {
            if (res.data.length > 0) {
                dispatch({
                    type: ON_REGISTER_FAIL,
                    payload: "username sudah digunakan",
                });
            }
            else{
                Axios.post(`${API_URL}users`, userData)
                // langsung dari form nya, yang di regis.jsx
                .then(res => {
                    console.log(res.data)
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data
                    })
                })
                .catch(err => {
                    console.log(err)
                });
            }
        })
    };
};

export const userKeepLogin = (userData) => {
    return (dispatch) => {
        Axios.get(`${API_URL}users`, {
            params:{
                id: userData.id,
            }
        })
        .then((res) => {
            if (res.data.length>0){
                dispatch({
                    type: ON_LOGIN_SUCCESS,
                    payload: res.data[0]
                })
            }
            else {
                dispatch({
                    type: ON_LOGIN_FAILED,
                    payload: "Username atau password salah"
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const logoutHandler = (userData) => {
    return {
            type: ON_LOGOUT_SUCCESS,
            payload: userData
    }
}