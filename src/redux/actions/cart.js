// disini yang nentuin apa yang dikirim ke global state
import Axios from 'axios'
import { API_URL } from '../../constants/API'

  export const totalCartHandler = (dataCart) => { //ngitung semua quantity barang di cart
    return (dispatch) => { // anggap dispatch = return
        Axios.get(`${API_URL}carts` ,{
            params: {
                userId: dataCart
            }
        })
        .then(res => {
            if (res.data.length>0){
                let temp = 0
                for (let i=0; i<res.data.length; i++){
                    temp += res.data[i]["quantity"]
                }
                dispatch({
                    type: "GET_CART_DATA",
                    payload: temp
                })
            } else 
            dispatch({
                type: "GET_CART_DATA",
                payload: 0
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const editTotalCartHandler = (id,quantity) => {//nambah cart
    return (dispatch) => { // anggap dispatch = return
        Axios.get(`${API_URL}carts` ,{
            params: {
                userId: id
            }
        })
        .then(res => {
                dispatch({
                    type: "GET_CART_DATA",
                    payload: quantity
                })
        })
        .catch(err => {
            console.log(err)
        })
    }
}