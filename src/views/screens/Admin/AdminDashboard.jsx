import React from "react";
import "./AdminDashboard.css";
import { Collapse, Button } from "reactstrap";
import Axios from "axios";

import { API_URL } from "../../../constants/API";

import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";

import swal from "sweetalert";

class AdminDashboard extends React.Component {
  state = {
    productList: [],
    createForm: {
      productName: "",
      price: 0,
      category: "Phone",
      image: "",
      desc: "",
    },
    editForm: {
      id: 0,
      productName: "",
      price: 0,
      category: "",
      image: "",
      desc: "",
    },
    activeProducts: [],
  };

  getProductList = () => {
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        this.setState({ productList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderProductList = () => {
    return this.state.productList.map((val, idx) => {
      const { id, productName, price, category, image, desc } = val;
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
            <td> {productName} </td>
            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}{" "}
            </td>
          </tr>
          <tr
            className={`collapse-item ${
              this.state.activeProducts.includes(idx) ? "active" : null
            }`}
          >
            <td className="" colSpan={3}>
              <div className="d-flex justify-content-around align-items-center">
                <div className="d-flex">
                  <img src={image} alt="" />
                  <div className="d-flex flex-column ml-4 justify-content-center">
                    <h5>{productName}</h5>
                    <h6 className="mt-2">
                      Category:
                      <span style={{ fontWeight: "normal" }}> {category}</span>
                    </h6>
                    <h6>
                      Price:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(price)}
                      </span>
                    </h6>
                    <h6>
                      Description:
                      <span style={{ fontWeight: "normal" }}> {desc}</span>
                    </h6>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <ButtonUI
                    onClick={(_) => this.editBtnHandler(idx)}
                    type="contained"
                  >
                    Edit
                  </ButtonUI>
                  <ButtonUI className="mt-3" type="textual">
                    Delete
                  </ButtonUI>
                </div>
              </div>
            </td>
          </tr>
        </>
      );
    });
  };

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  createProductHandler = () => {
    Axios.post(`${API_URL}/products`, this.state.createForm)
      .then((res) => {
        swal("Success!", "Your item has been added to the list", "success");
        this.setState({
          createForm: {
            productName: "",
            price: 0,
            category: "Phone",
            image: "",
            desc: "",
          },
        });
        this.getProductList();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be added to the list", "error");
      });
  };

  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.productList[idx],
      },
    });
  };

  editProductHandler = () => {
    Axios.put(
      `${API_URL}/products/${this.state.editForm.id}`,
      this.state.editForm
    )
      .then((res) => {
        swal("Success!", "Your item has been edited", "success");
        this.getProductList();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
  };

  componentDidMount() {
    this.getProductList();
  }

  render() {
    return (
      <div className="container py-4">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Products</h2>
          </caption>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{this.renderProductList()}</tbody>
            {/* 
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <TextField
                    value={this.state.createForm.productName}
                    onChange={(e) =>
                      this.inputHandler(e, "productName", "createForm")
                    }
                    placeholder="Name"
                  />
                </td>
                <td>
                  <TextField
                    value={this.state.createForm.price}
                    onChange={(e) => this.inputHandler(e, "price", "createForm")}
                    placeholder="Price"
                  />
                </td>
                <td colSpan={2}>
                  <select
                    value={this.state.createForm.category}
                    onChange={(e) =>
                      this.inputHandler(e, "category", "createForm")
                    }
                    className="form-control"
                  >
                    <option value="Phone">Phone</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Tab">Tab</option>
                    <option value="Desktop">Desktop</option>
                  </select>
                </td>
                <td>
                  <TextField
                    value={this.state.createForm.image}
                    onChange={(e) => this.inputHandler(e, "image", "createForm")}
                    placeholder="Image"
                  />
                </td>
                <td colSpan={2}>
                  <TextField
                    value={this.state.createForm.desc}
                    onChange={(e) => this.inputHandler(e, "desc", "createForm")}
                    placeholder="Description"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={7}></td>
                <td colSpan={1}>
                  <ButtonUI onClick={this.createProductHandler} type="contained">
                    Create
                  </ButtonUI>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <TextField
                    value={this.state.editForm.productName}
                    onChange={(e) =>
                      this.inputHandler(e, "productName", "editForm")
                    }
                    placeholder="Name"
                  />
                </td>
                <td>
                  <TextField
                    value={this.state.editForm.price}
                    onChange={(e) => this.inputHandler(e, "price", "editForm")}
                    placeholder="Price"
                  />
                </td>
                <td colSpan={2}>
                  <select
                    value={this.state.editForm.category}
                    onChange={(e) => this.inputHandler(e, "category", "editForm")}
                    className="form-control"
                  >
                    <option value="Phone">Phone</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Tab">Tab</option>
                    <option value="Desktop">Desktop</option>
                  </select>
                </td>
                <td>
                  <TextField
                    value={this.state.editForm.image}
                    onChange={(e) => this.inputHandler(e, "image", "editForm")}
                    placeholder="Image"
                  />
                </td>
                <td colSpan={2}>
                  <TextField
                    value={this.state.editForm.desc}
                    onChange={(e) => this.inputHandler(e, "desc", "editForm")}
                    placeholder="Description"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={7}></td>
                <td colSpan={1}>
                  <ButtonUI onClick={this.editProductHandler} type="contained">
                    Save
                  </ButtonUI>
                </td>
              </tr>
            </tfoot>
          */}
          </table>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
