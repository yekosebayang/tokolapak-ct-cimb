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
        dataKeranjangDetail: {
            productId: 0,
            productName: "",
            productImage: "",
            userId: 0,
            userName: "",
            productPrice: 0,
            quantity: 0,
        },
        totalBayar: 0,
        idBayar: [],
        delivery: 0,
        bayarActive: false,
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
            this.setState({ 
                dataKeranjangDetail: {
                    ...this.state.dataKeranjangDetail,
                    productId: res.data[0]['productId'],
                    productPrice: res.data[0].product.price,
                    productImage: res.data[0].product.image,
                    productName: res.data[0].product.productName,
                    quantity: res.data[0]['quantity'],
                    userId: this.props.user.id,
                    userName: this.props.user.name,
                }
            })
            
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

    inputHandler = (e) => {
        let { value } = e.target;
        this.setState({delivery: parseInt(value)})
        this.setState({bayarActive: false})
    };

    hitungTotal = () => {
        let temp = 0
        let id = []
        const {dataKeranjang} = this.state
        for(let i=0; i<dataKeranjang.length; i++){
            id.push(dataKeranjang[i]["id"])
            temp += parseInt(dataKeranjang[i]["product"]["price"]*dataKeranjang[i]["quantity"])
        }
        temp += this.state.delivery
        this.setState({idBayar: [...this.state.idBayar, id ]})
        this.setState({totalBayar: temp})
        this.setState({bayarActive: true})
    }

    btnBayar = () => {//
        // post transaksi
        let transaksiId = 0
        Axios.post(`${API_URL}transactions`,{
            userId: this.props.user.id,
            totalPrice: this.state.totalBayar,
            deliv: this.state.delivery,
            status: 'pending',
        })
        .then((res) => {
            this.biarGarefresh()
            // get ID transaksi
            Axios.get(`${API_URL}transactions`)
            .then((res) => {
                for (let i = 0; i<res.data.length; i++){
                    if (i == res.data.length-1){
                        transaksiId = parseInt(i+1)
                        // Post Transaction Detail
                            Axios.post(`${API_URL}transactionsd`,{
                                detail: this.state.dataKeranjangDetail,
                                transactionId: transaksiId })
                            .then((res) => {alert('sukses post Transaksi detail')
                                this.biarGarefresh()
                            })
                            .catch((err) => {
                                console.log(err)
                                alert('error post Transaksi detail')}) //called
                        // Post Transaction Detail   
                    }
                }
                swal("Transaksi diproses", `Terimakasih` , "success");
            
            })
            .catch((err) => {alert('error get ID transaksi')})
            // get ID transaksi
        })
        .catch((err) => {alert('error post transaksi')
        })
        // post transaksi



        // Delete data di cart
        for (let i=0; i<this.state.idBayar[0].length; i++){
            Axios.delete(`${API_URL}carts/${this.state.idBayar[0][i]}`)
                .then((res)=>{
                    this.biarGarefresh()
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
        this.props.reduceTotalCart(this.props.user.id,0)
    }

    // checkBoxHandler = (e,idx) => {
    //     const {checked} = e.target
    //     if (checked) {
    //         this.setState({ checkOutItems: [...this.state.checkOutItems, idx]}) //isi index yang dioper ke dalam state array baru
    //     } else {
    //         this.setState({
    //             checkOutItems: [
    //                 this.state.checkOutItems.filter((val) => val !==idx) //delete index 
    //             ]
    //         })
    //     }
    // }

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
                    <h3>Keranjang</h3>
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
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>
                            <select
                                value={this.state.delivery}
                                className="custom-text-input h-100 pl-3"
                                onChange={(e) => this.inputHandler(e)}
                                >
                                <option value={0}>Economy</option>
                                <option value={20000}>Express</option>
                                <option value={50000}>Same Day</option>
                                <option value={100000}>Instant</option>
                            </select>
                            <p>Delivery fee: <br/> {this.state.delivery}</p>
                            </th>
                            <th>
                                <ButtonUI
                                    className=""
                                    onClick={()=>this.hitungTotal()}>
                                    total
                                </ButtonUI>
                            </th>
                        </tr>
                    </tfoot>
                    </table>
                        {this.state.bayarActive  ? (
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
