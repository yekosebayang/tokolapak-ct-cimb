import React from "react";
import "./AdminReportUser.css";
import Axios from "axios";

import { API_URL } from "../../../../constants/API";

import ButtonUI from "../../../components/Button/Button";

import swal from "sweetalert";

class AdminItem extends React.Component {
  state = {
    transactionList: [],
    terimaForm: [],
    modalOpen: false,
  };

  getTransactionList = () => {
    Axios.get(`${API_URL}transactions`, {
      params: {
          status: "terima",
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

componentDidMount() {
  this.getTransactionList();
}

  renderTransactionList = () => {
    return this.state.transactionList.map((val, idx) => {
      const {totalPrice, status, id, user} = val;
      return (
        <>
            <tr key={`dataTransactionUser-${val.id}`}>
                    <th>{idx+1}</th>
                    <th>{user.username}</th>
                    <th>{status}</th>
                    <th>{totalPrice}</th>
                </tr> 
        </>
      );
    });
  };
//  toggleModal = () => {
//     this.setState({ modalOpen: !this.state.modalOpen });
//   };
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
export default AdminItem;