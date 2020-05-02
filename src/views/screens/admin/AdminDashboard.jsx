import React from 'react'
import {Table} from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField"


class AdminDashboard extends React.Component {

    state = {
        listProduk: [],
        emptyForm: {
            productName: "",
            price: "",
            desc:"",
            image:"",
            category:"Phone",
        },
        createForm: {
            productName: "",
            price: "",
            desc:"",
            image:"",
            category:"Phone",
        },
        editForm: {
            productName: "",
            price: "",
            desc:"",
            image:"",
            category:"Phone",
        }
    }

    getListProduk = () => {
        Axios.get(`${API_URL}products`)
        .then((res) => {
            console.log(res.data)
            this.setState({listProduk: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    componentDidMount() {
        this.getListProduk()
    }

    renderProduklist = () => {
        return this.state.listProduk.map((val,idx) => {
            const {id, productName, price, category, image, desc} = val
            return(
                <tr key={`adminlistproduk-${id}`}>
                    <td>{id}</td>
                    <td>{productName}</td>
                    <td>{price}</td>
                    <td>{category}</td>
                    <td><img src={image} alt="" style={{height: "100px", objectFit: "contain"}}/></td>
                    <td>{desc}</td>
                    <td className="d-flex flex-row">
                        <ButtonUI 
                            type="contained"
                            onClick={() => this.editBtnHandler(idx)}
                        >Edit</ButtonUI>
                        <ButtonUI type="outlined" style={{outlineColor: "red"}}className="ml-2">Delete</ButtonUI>
                    </td>

                </tr>
            )
        })
    }

    createProductHandler = () => {
        Axios.post(`${API_URL}products`, this.state.createForm)
        .then((res) => {
            console.log(res.data)
            alert("success")
            this.getListProduk()
        })
        .catch((err) => {
            console.log(err)
            alert("item nya gabisa ditambah")
        })
    }

    editBtnHandler = () => {
        alert('masiok')
    }

    editProductHandler = () => {
        Axios.put(`${API_URL}products/${this.state.editForm.id}` , this.state.editForm)
        .then((res) => {
            console.log(res)
            alert("sukses edit")
            this.getListProduk()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    inputHandler = (e, field, form) => {
        const {value} = e.target
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            }
        })
    }


    render () {
        return (
            <div className="container py-4">
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Produk</th>
                            <th>Harga</th>
                            <th>Kategori</th>
                            <th>Gambar</th>
                            <th>Deskripsi</th>
                            <th colSpan={2}>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProduklist()}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colSpan={2}>
                            <TextField
                                // value={this.state.emptyForm.productName} 
                                placeholder="Name"
                                onChange={(e) => this.inputHandler(e, "productName", "createForm")}
                            />
                        </td>
                        <td>
                            <TextField 
                                // value={this.state.emptyForm.price} 
                                placeholder="Price"
                                onChange={(e) => this.inputHandler(e, "price", "createForm")}
                            />
                        </td>
                        <td colSpan={2}>
                            <select 
                                // value={this.state.emptyForm.category} 
                                className="form-control" 
                                onChange={(e) => this.inputHandler(e, "category", "createForm")} 
                            >
                                <option value="Phone">Phone</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Tab">Tab</option>
                                <option value="Desktop">Desktop</option>
                            </select>
                        </td>
                        <td>
                            <TextField
                                // value={this.state.emptyForm.image} 
                                placeholder="Link Gambar"
                                onChange={(e) => this.inputHandler(e, "image", "createForm")}
                            />
                        </td>
                        <td colSpan={2}>
                            <TextField
                                // value={this.state.emptyForm.desc}
                                placeholder="Deskripsi"
                                onChange={(e) => this.inputHandler(e, "desc", "createForm")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={7}></td>
                        <td colSpan={1}>
                            <ButtonUI onClick={this.createProductHandler} type="contained">Buat</ButtonUI>
                        </td>
                    </tr>

                    {/* edit form */}
                    <tr>
                        <td colSpan={2}>
                            <TextField 
                                value={this.state.emptyForm.image} 
                                placeholder="Name"
                                onChange={(e) => this.inputHandler(e, "productName", "editForm")}

                            />
                        </td>
                        <td>
                            <TextField 
                                placeholder="Price"
                                onChange={(e) => this.inputHandler(e, "price", "editForm")}
                            />
                        </td>
                        <td colSpan={2}>
                            <select className="form-control" onChange={(e) => this.inputHandler(e, "category", "editForm")}>
                                <option value="Phone">Phone</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Tab">Tab</option>
                                <option value="Desktop">Desktop</option>
                            </select>
                        </td>
                        <td>
                            <TextField 
                                placeholder="Link Gambar"
                                onChange={(e) => this.inputHandler(e, "image", "editForm")}
                            />
                        </td>
                        <td colSpan={2}>
                            <TextField 
                                placeholder="Deskripsi"
                                onChange={(e) => this.inputHandler(e, "desc", "editForm")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={7}></td>
                        <td colSpan={1}>
                            <ButtonUI onClick={this.editProductHandler} type="contained">Ubah</ButtonUI>
                        </td>
                    </tr>

                    </tfoot>

                    
                </Table>
            </div>
        )
    }
}

export default AdminDashboard