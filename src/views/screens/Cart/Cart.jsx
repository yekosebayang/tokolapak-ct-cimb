import React from "react"
import {connect} from "react-redux"
import "./Cart.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import ButtonUI from "../../components/Button/Button";
import {Alert} from "reactstrap"
import { Link } from "react-router-dom"
import { editTotalCartHandler } from "../../../redux/actions";
import swal from "sweetalert";

class Cart extends React.Component {
    state = {
        dataKeranjang: [],
        totalBayar: 0,
        idBayar: [],
        checkOutItems: []
    }

    componentDidMount () {
        this.biarGarefresh()
        // this.hitungTotal()
    }

    biarGarefresh = () => {
        Axios.get(`${API_URL}carts`, {
            params: {
                userId: this.props.user.id,
                _expand: "product"
            }
        })
        .then((res) =>{
            this.setState({ dataKeranjang: res.data })
            // console.log("data keranjang below")
            // console.log(this.state.dataKeranjang)
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    hapusKeranjang = (id,name,qty) => {
        Axios.delete(`${API_URL}carts/${id}`)
        .then((res) => {
            let temp = this.props.cart.qty - qty
            alert(`${name}berhasil dihapus`)
            this.props.reduceTotalCart(this.props.user.id,temp)
            this.biarGarefresh()
        })  
        .catch((err) => {
            console.log(err)
        })
    }

    hitungTotal = () => {
        let temp = 0
        let id = []
        const {dataKeranjang} = this.state
        for(let i=0; i<dataKeranjang.length; i++){
            console.log(dataKeranjang[i]["id"])
            id.push(dataKeranjang[i]["id"])
            temp += dataKeranjang[i]["product"]["price"]*dataKeranjang[i]["quantity"]
        }
        this.setState({idBayar: [...this.state.idBayar, id ]})
        this.setState({totalBayar: temp})
    }

    btnBayar = () => {//
        console.log(this.state.idBayar[0])
        for (let i=0; i<this.state.idBayar[0].length; i++){
            Axios.delete(`${API_URL}carts/${this.state.idBayar[0][i]}`)
            .then((res) => {
                // console.log(res.data)
                this.biarGarefresh()
            })
            .catch((err) => {
                console.log(err)
            })
        }
        this.props.reduceTotalCart(this.props.user.id,0)
        swal("Transaksi berhasil", `Terimakasih` , "success");
    }

    checkBoxHandler = (e,idx) => {
        const {checked} = e.target
        if (checked) {
            this.setState({ checkOutItems: [...this.state.checkOutItems, idx]}) //isi index yang dioper ke dalam state array baru
        } else {
            this.setState({
                checkOutItems: [
                    this.state.checkOutItems.filter((val) => val !==idx) //delete index 
                ]
            })
        }
    }

    renderCart = () => { 
        return this.state.dataKeranjang.map((val, idx) => {
            return (
                <tr key={`dataKeranjang-${val.id}`}>
                    <th>{idx+1}</th>
                    <th>{val.product.productName}</th>
                    <th>{val.quantity}</th>
                    <th>{val.product.price}</th>
                    <th>{val.product.category}</th>
                    <th><img src={val.product.image} width="60px"/></th>
                    <th>
                            <ButtonUI
                            className="ml-2 mr-0"
                            onClick={()=>this.hapusKeranjang(val.id,val.product.productName,val.quantity)}
                            style={{backgroundColor: "red"}}
                            >hapus</ButtonUI>
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
                        <th>amount</th>
                        <th>Harga</th>
                        <th>Kategori</th>
                        <th>Image</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                        <ButtonUI
                            className=""
                            onClick={()=>this.hitungTotal()}>
                            total
                        </ButtonUI>
                    </tbody>
                    </table>
                        {this.state.totalBayar > 0 ? (
                            <div className="d-flex flex-row container">
                                <h1>{this.state.totalBayar}</h1>
                                <ButtonUI
                                className="ml-2 mr-0"
                                onClick={()=>this.btnBayar()}
                                >Bayar</ButtonUI>
                            </div>
                        ) : null
                        }
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
      cart: state.cart
    }
  }

const mapDispatchToProps = {
  reduceTotalCart: editTotalCartHandler
};
  
  export default connect(mapStatetoProps, mapDispatchToProps)(Cart)
