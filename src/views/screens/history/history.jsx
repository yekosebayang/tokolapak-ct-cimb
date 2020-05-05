// isinya transaksi setiap id
import React from "react"
import {connect} from "react-redux"
import "./history.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import {Alert} from "reactstrap"
import { Link } from "react-router-dom"

import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class History extends React.Component {
    state = {
        dataHistory: [],
        modalOpen: false,    
    }

    componentDidMount () {
        this.biarGarefresh()
        // console.log(this.state.dataHistory)
    }

    biarGarefresh = () => {
        Axios.get(`${API_URL}transactions`, {
            params: {
                userId: this.props.user.id,
                _expand: "user"
            }
        })
        .then((res) =>{
            this.setState({ dataHistory: res.data })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    // // toggleModal = () => {
    //     this.setState({ modalOpen: !this.state.modalOpen });
    //     // this.renderModal()
    //   };

    // renderModal = () => {
    
    // }
    
    renderHistoryList = () => {
        return this.state.dataHistory.map((val, idx) => {
          const {totalPrice, status, user} = val;
          return (
            <>
                <tr key={`dataHistory-${val.id}`}>
                        <th>{idx+1}</th>
                        <th>{user.username}</th>
                        <th>{status}</th>
                        <th>{totalPrice}</th>
                        {/* <th>
                            <ButtonUI onClick={this.toggleModal()} type="contained">
                                Detail
                            </ButtonUI>
                        </th> */}
                    </tr> 
            </>
          );
        });
      };

    render() {
        if (this.state.dataHistory.length > 0){
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
                        {/* <th>
                            
                        </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderHistoryList()}
                    </tbody>
                    </table>
    
                    {/* <Modal
                     toggle={this.toggleModal}
                     isOpen={this.state.modalOpen}
                     className="edit-modal"
                    >
                        <ModalHeader toggle={this.toggleModal}>
                        <caption>
                            <h3>Edit Product</h3>
                        </caption>
                        </ModalHeader>
                        <ModalBody>
                            <table>
                                <tr>
                                    <td>a</td>
                                    <td>b</td>
                                    <td>c</td>
                                    <td>d</td>
                                </tr>
                            </table>
                        </ModalBody>
                    </Modal> */}

            </div>
            
                
            )
        } else {
            return(
                <Alert>
                    Belum ada History, <Link to="/">Yuk!! belanja</Link>
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
  
  export default connect(mapStatetoProps)(History)
