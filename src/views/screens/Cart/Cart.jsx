import React from "react"
import {connect} from "react-redux"
import "./Cart.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import ButtonUI from "../../components/Button/Button";
import { getDefaultNormalizer } from "@testing-library/react"
import {Table, Alert} from "reactstrap"
import { Link } from "react-router-dom"

class Cart extends React.Component {
    state = {
        dataKeranjang: []
    }

    componentDidMount () {
        this.biarGarefresh()
    }

    biarGarefresh = () => {
        Axios.get(`${API_URL}cart`, {
            params: {
                userId: this.props.user.id,
                _expand: "product"
            }
        })
        .then((res) =>{
            this.setState({ dataKeranjang: res.data })
            console.log(this.state.dataKeranjang)
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    hapusKeranjang = (id,name) => {
        Axios.delete(`${API_URL}cart/${id}`)
        .then((res) => {
            alert(`${name}berhasil dihapus`)
            console.log(res.data)
            this.biarGarefresh()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderCart = () => { 
        return this.state.dataKeranjang.map((val, idx) => {
            return (
                <tr key={`dataKeranjang-${val.id}`}>
                    <th>{idx+1}</th>
                    <th>{val.product.productName}</th>
                    <th>{val.product.price}</th>
                    <th>{val.product.category}</th>
                    <th><img src={val.product.image} width="60px" className="contained"/></th>
                    <th>
                        <ButtonUI
                        onClick={()=>this.hapusKeranjang(val.id,val.product.productName)}
                        style={{backgroundColor: "red"}}
                        >X</ButtonUI>
                    </th>
                </tr> 
            )
        })
    }

    render() {
        if (this.state.dataKeranjang.length > 0){
            return (
                <div className="container">
                    <table className="table table-hover">
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Produk</th>
                        <th>Harga</th>
                        <th>Kategori</th>
                        <th>Image</th>
                        <th></th>
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
                    keranjang anda kosong, <Link to="/">Yuk!! belanja</Link>
                </Alert>
            )
        }
      
  }
}

const mapStatetoProps = (state) => {
    return {
      user: state.user,
    }
  }
  
  export default connect(mapStatetoProps)(Cart)
