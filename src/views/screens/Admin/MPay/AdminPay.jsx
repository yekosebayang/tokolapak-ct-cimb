import React from "react";
import "./AdminPay.css";
import Axios from "axios";

import { API_URL } from "../../../../constants/API";

import ButtonUI from "../../../components/Button/Button";

import swal from "sweetalert";

class AdminPay extends React.Component {
  state = {
    transactionList: [],
    terimaForm: [],
    modalOpen: false,
  };

  getTransactionList = () => {
    Axios.get(`${API_URL}transactions`, {
      params: {
          _expand: "user"}
        })
      .then((res) => {
        this.setState({ transactionList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteBtnHandler = (id,name) => {
    Axios.delete(`${API_URL}transactions/${id}`)
    .then((res) => {
        swal("Success!", `transaksi ${name} been deleted from the list`, "success")
        console.log(res.data)
        this.getTransactionList();
    })
    .catch((err) => {
        console.log(err)
    })
}
  terimaBtnHandler = (id,nama,userId,totalPrice) => {
    console.log(userId)
    console.log(totalPrice)
    Axios.put(`${API_URL}transactions/${id}`,{
        userId,
        totalPrice,
        status: "terima",
        id: id
      }
    )
      .then((res) => {
        swal("Success!", `${nama} transaction has been approved`, "success");
        this.getTransactionList()
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
}

componentDidMount() {
  this.getTransactionList();
}

  renderTransactionList = () => {
    return this.state.transactionList.map((val, idx) => {
      const {totalPrice, status, id, user} = val;
      return (
        <>
            <tr key={`dataTransaction-${val.id}`}>
                    <th>{idx+1}</th>
                    <th>{user.username}</th>
                    <th>{user.id}</th>
                    <th>{status}</th>
                    <th>{totalPrice}</th>
                    <th>
                            <ButtonUI
                            className="ml-2 mr-0"
                            onClick={()=>this.terimaBtnHandler(id,user.username,user.id,totalPrice)}
                            >terima</ButtonUI>
                            <ButtonUI
                            className="ml-2 mr-0"
                            onClick={()=>this.deleteBtnHandler(id,user.username)}
                            style={{backgroundColor: "red"}}
                            >hapus</ButtonUI>
                    </th>
                </tr> 
        </>
      );
    });
  };

 toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  render() {
    return (
      <div className="container">
                    <h3 className="text-center">Detail Transaksi</h3>
                    <table className="table table-hover">
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Aksi</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTransactionList()}
                    </tbody>
                    </table>
        </div>
        
    );
  }
}

export default AdminPay;
