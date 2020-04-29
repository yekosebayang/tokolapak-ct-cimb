import React from "react"
import "./ProductDetails.css"
import ButtonUI from "../../components/Button/Button"
import Axios from "axios"
import { API_URL } from "../../../constants/API";
import { connect, shallowEqual } from "react-redux"
import { faSwatchbook } from "@fortawesome/free-solid-svg-icons";

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
        Axios.get(`${API_URL}products/${this.props.match.params.id}`)
        .then((res) => {
            console.log(res)
            this.setState({ productData: res.data
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    addToCartHandler = (name) => {
        Axios.post(`${API_URL}cart`,{
            userId: this.props.user.id,
            productId: this.state.productData.id,
            quantity: 1,
        })
        .then((res) => {
            console.log(res)
            this.setState({ productData: res.data})
            alert(`${name} masuk keranjang`)
            this.render()
            
        })
        .catch((err) =>{
            console.log(err)
        })
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
                            <ButtonUI className="ml-4" type="outlined">
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
    }
  }
  
  export default connect(mapStatetoProps)(ProductDetails)
