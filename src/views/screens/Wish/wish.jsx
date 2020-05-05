import React from "react"
import {connect} from "react-redux"
import "./wish.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import ButtonUI from "../../components/Button/Button";
import {Alert} from "reactstrap"
import { Link } from "react-router-dom"
import swal from "sweetalert";
import { editTotalCartHandler} from "../../../redux/actions";

class Wish extends React.Component {
    state = {
        dataWish: [],
        totalBayar: 0,
        idBayar: [],
        checkOutItems: [],
    }

    componentDidMount () {
        this.biarGarefresh()
    }

    biarGarefresh = () => {
        Axios.get(`${API_URL}wishlists`, {
            params: {
                userId: this.props.user.id,
                _expand: "product" //ngambil product yang idProduct nya sama kaya id di /product
            }// dont ask why, ini emang design nya db-json
        })
        .then((res) =>{
            this.setState({ dataWish: res.data })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    addToCartHandler = (productId, name, qty, wishId) => {
        let temp2 = this.props.cart.qty + qty
        if (this.props.user.cookieChecked){
            Axios.get(`${API_URL}carts` ,{
                params: {
                    userId: this.props.user.id,
                    productId,
                }
            })
            .then((res) => {
                if (res.data.length > 0){ //tambah qty
                    let cartId = res.data[0].id
                    let temp = res.data[0].quantity + qty //total qty per product
                    Axios.put(`${API_URL}carts/${cartId}`,{ //tambah qty ke cart
                                userId: this.props.user.id,
                                productId,
                                quantity: temp,// nambah data di cart
                    })
                    .then((res) => { //tambah qty
                        this.props.addTotalCart(this.props.user.id,temp2)// nambah data di total cart
                        swal("Add to cart", `${name} berhasil ditambah kekeranjang` , "success");
                        this.hapusWish(wishId)   
                    })
                    .catch((err) => {//tambah qty
                        swal("Add to cart" , `${name} failed added to your cart 😋 ${err}` , "error");
                    })
                } else { //data masih 0
                    Axios.post(`${API_URL}carts`,{
                        userId: this.props.user.id,
                        productId,
                        quantity: qty,
                    })
                    .then((res) => {
                        this.setState({ productData: res.data})
                        this.props.addTotalCart(this.props.user.id,qty)
                        swal("Add to cart", `${name} berhasil ditambah kekeranjangx` , "success");
                        this.hapusWish(wishId)   
                    })
                    .catch((err) =>{
                    swal("Add to cart" , `${name} failed added to your cart 😋` , "error");
                    console.log(err)
                    })
                }
            })
            .catch((err) =>{
                console.log(err)
            })
        } else {
            swal("Gagal Autentikasi","Anda belum login/daftar","error" )
        }
    }

    hapusWish = (id) => {
        Axios.delete(`${API_URL}wishlists/${id}`)
        .then((res) => {
            this.biarGarefresh()
        })  
        .catch((err) => {
            console.log(err)
        })
    }

    renderCart = () => { 
        return this.state.dataWish.map((val, idx) => {
            return (
                <tr key={`dataWish-${val.id}`}>
                    <th>{idx+1}</th>
                    {/* <th>{val.product.productName}</th> */}
                    <th>{val.product.productName}</th>
                    <th>{val.quantity}</th>
                    <th>{val.product.price}</th>
                    <th>{val.product.category}</th>
                    <th><img src={val.product.image} width="60px"/></th>
                    <th>
                        <td className="d-flex">
                        <ButtonUI
                         className="ml-2 mr-0"
                         onClick={()=>this.addToCartHandler(val.product.id,val.product.productName,val.quantity,val.id)}
                         >🛒</ButtonUI>
                        <ButtonUI
                         className="ml-2 mr-0"
                         onClick={()=>this.hapusWish(val.id)}
                         style={{backgroundColor: "red"}}
                         >🗑️</ButtonUI>
                         </td>
                    </th>   
                    
                </tr>
            )
        }) 
    }

    render() {
        if (this.state.dataWish.length > 0){
            return (
                <div className="container">
                    <h3 className="text-center">Wishlists</h3>
                    <table className="table table-hover">
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Produk</th>
                        <th>amount</th>
                        <th>Harga</th>
                        <th>Kategori</th>
                        <th>Image</th>
                        <th colSpan={'2'}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                    </table>
                </div>
                
            )
        } else {
            return(
                <Alert>
                    Wishlists anda kosong, <Link to="/">Yuk!! belanja</Link>
                </Alert>
            )
        }
      
  }
}

const mapStatetoProps = (state) => {
    return {
      user: state.user,
      cart: state.cart
    }
  } 

const mapDispatchToProps = {
  addTotalCart: editTotalCartHandler
};
  
  export default connect(mapStatetoProps, mapDispatchToProps)(Wish)
