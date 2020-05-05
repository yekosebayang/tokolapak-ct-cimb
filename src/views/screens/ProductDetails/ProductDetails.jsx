import React from "react"
import "./ProductDetails.css"
import ButtonUI from "../../components/Button/Button"
import Axios from "axios"
import { API_URL } from "../../../constants/API";
import { connect } from "react-redux"
import swal from "sweetalert";
import { editTotalCartHandler} from "../../../redux/actions";




class ProductDetails extends React.Component {
    state ={
        productData: {
            productName: "",
            price: 0,
            category: "",
            image: "",
            desc: "",
            id: 0
        }
    }
    componentDidMount() {
        this.renderProdukDetail()
    }

    renderProdukDetail = () => {
        Axios.get(`${API_URL}products/${this.props.match.params.id}`)
        .then((res) => {
            // console.log(res.data)
            this.setState({ productData: res.data})
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    addToWishHandler = (name) => {
        if (this.props.user.cookieChecked){
            Axios.get(`${API_URL}wishlists` ,{
                params: {
                    userId: this.props.user.id,
                    productId: this.state.productData.id,
                }
            })
            .then((res) => {
                console.log(res.data)
                if (res.data.length > 0){ //tambah qty
                    let Id = res.data[0].id
                    let temp = (res.data[0].quantity) + 1
                    Axios.put(`${API_URL}wishlists/${Id}`,{ //tambah qty
                                userId: this.props.user.id,
                                productId: this.state.productData.id,
                                quantity: temp,
                    })
                    .then((res) => { //tambah qty
                        swal("Add to wish", `${name} berhasil ditambah ke "Wishlist"` , "success");
                        this.renderProdukDetail()   
                    })
                    .catch((err) => {//tambah qty
                        swal("Add to wish" , `${name} failed added to your wishlists 😋 ${err}` , "error");
                    })
                } else { //data masih 0
                    Axios.post(`${API_URL}wishlists`,{
                        userId: this.props.user.id,
                        productId: this.state.productData.id,
                        quantity: 1,
                    })
                    .then((res) => {
                        // this.setState({ productData: res.data})
                        swal("Add to wish", `${name} berhasil ditambah ke "wishlists;` , "success");
                        this.renderProdukDetail()   
                    })
                    .catch((err) =>{
                    swal("Add to wishlist" , `${name} failed added to your wishlist 😋` , "error");
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

    addToCartHandler = (name) => {
        // POST method ke /cart
        // Isinya: userId, productId, quantity
        // console.log(this.props.user.id);
        if (this.props.user.cookieChecked){
            Axios.get(`${API_URL}carts` ,{
                params: {
                    userId: this.props.user.id,
                    productId: this.state.productData.id,
                }
            })
            .then((res) => {
                // console.log(res.data)
                let temp2 = this.props.cart.qty + 1
                if (res.data.length > 0){ //tambah qty
                    let cartId = res.data[0].id
                    let temp = (res.data[0].quantity) + 1
                    Axios.put(`${API_URL}carts/${cartId}`,{ //tambah qty
                                userId: this.props.user.id,
                                productId: this.state.productData.id,
                                quantity: temp, //tambah ke cart
                    })
                    .then((res) => { //tambah qty
                        this.props.addTotalCart(this.props.user.id,temp2)
                        swal("Add to cart", `${name} berhasil ditambah kekeranjang` , "success");
                        this.renderProdukDetail()   
                    })
                    .catch((err) => {//tambah qty
                        swal("Add to cart" , `${name} failed added to your cart 😋 ${err}` , "error");
                    })
                } else { //data masih 0
                    Axios.post(`${API_URL}carts`,{
                        userId: this.props.user.id,
                        productId: this.state.productData.id,
                        quantity: 1,
                    })
                    .then((res) => {
                        this.setState({ productData: res.data})
                        this.props.addTotalCart(this.props.user.id,temp2)
                        swal("Add to cart", `${name} berhasil ditambah kekeranjang` , "success");
                        this.renderProdukDetail()   
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

    render() {
        const {
            productName,
            price,
            image,
            desc,
        } = this.state.productData
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img 
                        style={{ width: "100%", objectFit: "contain", height:"550px"}}
                        src={image}
                        alt=""/>
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                        <h2>{productName}</h2>
                        <h4>
                            {
                                new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
                                .format(price)
                            }
                        </h4>
                        <p>
                            {desc}
                        </p>
                        <div className="d-flex flex-row mt-4">
                            <ButtonUI onClick={() => this.addToCartHandler(productName)}>Add To Cart</ButtonUI>
                            <ButtonUI 
                            onClick={() => this.addToWishHandler(productName)}
                            className="ml-4" type="outlined">
                                Add To Wishlist
                            </ButtonUI>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
      user: state.user,
      cart: state.cart,
    }
}

const mapDispatchToProps = {
    addTotalCart: editTotalCartHandler
};
    
export default connect(mapStatetoProps, mapDispatchToProps)(ProductDetails)
