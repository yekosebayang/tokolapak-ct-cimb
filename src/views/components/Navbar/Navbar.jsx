import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Navbar.css";
import ButtonUI from "../Button/Button";
import { logoutHandler, searchHandler, totalCartHandler, updateCartTotal } from "../../../redux/actions";


const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
    dropdownOpen: false,
    productName: "",
    // totalCart: 0,
    // currentId: 0
  };

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  logoutBtnHandler = () => {
    this.props.onLogout();
    // this.forceUpdate();
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  componentDidUpdate(){
    // if (this.props.user.id != this.state.currentId){
    //   let id = this.props.user.id
    //   this.props.totalCart(id)
    // }
    if (this.props.cart.cartChange == true){
      let id = this.props.user.id
      this.props.totalCart(id)
      this.props.updateCartTotal(false)
    }
  }

  componentDidMount(){
    // this.setState({currentId: this.props.user.id})
    this.props.totalCart(this.props.user.id)
    // this.props.updateCartTotal(true)
    // console.log(this.props.user.id)
  }

  inputHandler = (e) => { // search bar
    this.setState({cariData: e.target.value});
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
        <div className="logo-text">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            LOGO
          </Link>
        </div>
        <div
          style={{ flex: 1 }}
          className="px-5 d-flex flex-row justify-content-start"
        >
          <input
            onFocus={this.onFocus} onBlur={this.onBlur}
            className={`search-bar ${
              this.state.searchBarIsFocused ? "active" : null
            }`}
            type="text"
            placeholder="Cari produk impianmu disini"
            onChange={(e) => this.props.cariData(e.target.value)}
            value={this.props.srch.searchData}
          />
        </div>
        <div className="d-flex flex-row align-items-center">
          {this.props.user.id ? (
            <>
              <Dropdown
                toggle={this.toggleDropdown}
                isOpen={this.state.dropdownOpen}
              >
                <DropdownToggle tag="div" className="d-flex">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                  <p className="small ml-3 mr-4">{this.props.user.username}</p>
                </DropdownToggle>
                  {this.props.user.role === "admin" ? (
                  <DropdownMenu className="mt-2">
                  <DropdownItem>
                    <Link
                      style={{ color: "inherit", textDecoration: "none" }}
                      to="/admin/dashboard" >
                      Dashboard
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link
                      style={{ color: "inherit", textDecoration: "none" }}
                      to="/admin/report/user" >
                      Report User
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link
                      style={{ color: "inherit", textDecoration: "none" }}
                      to="/admin/report/item" >
                      Report Item
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link
                      style={{ color: "inherit", textDecoration: "none" }}
                      to="/admin/Payment" >
                      Payment
                    </Link>
                  </DropdownItem>
                  </DropdownMenu>
                  ):(
                    <DropdownMenu className="mt-2">
                      <DropdownItem>
                        <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/wish" >
                        Whislists
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/history" >
                          History
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  )
                }
              </Dropdown>
              <Link
                className="d-flex flex-row"
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faShoppingCart}
                  style={{ fontSize: 24 }}
                />
                <CircleBg>
                  <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                    {this.props.cart.qty}
                  </small>
                </CircleBg>
              </Link>
              <ButtonUI
                onClick={this.logoutBtnHandler}
                className="ml-3"
                type="textual"
              >
              <Link
                style ={{ textDecoration: "none", color: "inherit"}}
                to="/auth/login">Logout</Link>
              </ButtonUI>
            </>
          ):(
            <>
            <ButtonUI className="mr-3" type="textual">
              <Link
              style ={{ textDecoration: "none", color: "inherit"}}
              to="/auth/login">
                {/* <Redirect to={`/product/${this.props.data.id}`} /> */}
                Sign in
              </Link>
            </ButtonUI>
            <ButtonUI type="contained">
              <Link
                style ={{ textDecoration: "none", color: "inherit"}}
                to="/auth/register">
                Sign up
              </Link>
            </ButtonUI>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    srch: state.srch,
    cart: state.cart
  };
};

const mapDispatchToProps = {
  onLogout: logoutHandler,
  cariData: searchHandler,
  totalCart: totalCartHandler,
  updateCartTotal
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
