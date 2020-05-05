import React from "react";
import "./AdminPay.css";
import Axios from "axios";

import { API_URL } from "../../../../constants/API";

import ButtonUI from "../../../components/Button/Button";

import swal from "sweetalert";

class AdminPay extends React.Component {
  state = {
    transactionDetail: [],
    terimaForm: [],
    activeProducts: [],
  };


terimaBtnHandler = (id,userId,totalPrice,deliv) => {
    Axios.put(`${API_URL}transactions/${id}`,{
      userId,
      totalPrice,
      deliv,
      status: "pending",
      })
      .then((res) => {
        // swal("Success!", `transaction has been approved`, "success");
      })
      .catch((err) => {
        // swal("Error!", "Your item could not be edited", "error");  
        console.log(err);
      });
}

getTransactionDetail = () => {
  Axios.get(`${API_URL}transactionsd`, {
    params: {
      _expand: "transaction",
    }
      })
    .then((res) => {
      this.setState({ transactionDetail: res.data });
      // console.log(this.state.transactionDetail[0]['detail']['productId'])
      // console.log(this.state.transactionDetail[0]['transaction']['deliv'])
    })
    .catch((err) => {
      alert("gagalTransaksiList");
    });
};

componentDidMount() {
  this.getTransactionDetail();
}

renderTransactionList = () => {
    return this.state.transactionDetail.map((val, idx) => {
      const { id, detail, transaction } = val;
      return (
        <>
          <tr
            onClick={() => {
              if (this.state.activeProducts.includes(idx)) {
                this.setState({
                  activeProducts: [
                    ...this.state.activeProducts.filter((item) => item !== idx),
                  ],
                });
              } else {
                this.setState({
                  activeProducts: [...this.state.activeProducts, idx],
                });
              }
            }}
          >
            <td> {id} </td>
            <td> {detail.userName}</td>
            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(transaction.deliv)}{" "}
            </td>
            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(transaction.totalPrice)}{" "}
            </td>
          </tr>
          <tr key={`Datatransaksi-${transaction.id}`}
            className={`collapse-item ${
              this.state.activeProducts.includes(idx) ? "active" : null
            }`}
          >
            <td className="" colSpan={3}>
              <div className="d-flex justify-content-around align-items-center">
                <div className="d-flex">
                  <img src={detail.productImage} alt="" />
                  <div className="d-flex flex-column ml-4 justify-content-center">
                    <h5>{detail.productId}</h5>
                    <h6>
                      Price:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(detail.productPrice)}
                      </span>
                    </h6>
                    <h6>
                      Status:
                      <span style={{ fontWeight: "normal" }}> {transaction.status}</span>
                    </h6>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <ButtonUI
                    onClick={this.terimaBtnHandler(id,detail.userId,transaction.totalPrice,transaction.deliv)}
                    type="contained"
                  >terima
                  </ButtonUI>
                </div>
              </div>
            </td>
          </tr>
        </>
      );
    })
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
                        <th>Deliv.Fee</th>
                        <th>Total</th>
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
