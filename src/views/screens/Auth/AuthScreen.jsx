import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import "./AuthScreen.css";

// actions
import { registerHandler, loginHandler } from "../../../redux/actions";

class AuthScreen extends React.Component {
  state = {
    activePage: "",
    loginForm: {
      username: "",
      password: "",
      showPassword: false,
    },
    registerForm: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      showPassword: false,
    },
  };

  // componentDidMount(){
  //   console.log(this.props.match.params.pg)
  //   this.setState({activePage: this.props.match.params.pg})
  // }

  checkBoxHandler(e, form) {
    const target = e.target
    const checked = target.name 

    this.setState({
      [form]: {
        ...this.state[form],
        showPassword: checked
      }
    })
  }

  componentDidMount(){
    this.setState({activePage: this.props.match.params.pg})
  }

  componentDidUpdate() {
    if (this.props.user.id) {
      alert("login");
      const cookie = new Cookies();
      cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
    }
    if (this.props.match.params.pg != this.state.activePage){
      let temp = this.props.match.params.pg
      this.setState({activePage: temp})
    }
  }

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });

    // console.log(e.target);

    // this.setState({ loginForm: {
    //   ...this.state.loginForm,
    //   [fieldYangDiganti]: value
    // }})
  };

  registerBtnHandler = () => {
    const { username, fullName, password, email } = this.state.registerForm;
    let newUser = {
      username,
      fullName,
      password,
      email,
    };

    this.props.onRegister(newUser);
  };

  loginBtnHandler = () => {
    const { username, password } = this.state.loginForm;
    let newUser = {
      username,
      password,
    };

    this.props.onLogin(newUser);
  };

  checkboxHandler = (e, form) => {
    const { checked } = e.target;

    console.log(checked);

    this.setState({
      [form]: {
        ...this.state[form],
        showPassword: checked,
      },
    });
  };

  renderAuthComponent = () => {
    const { activePage } = this.state;
    // alert(activePage)
    if (activePage === "register") {
      return (
        <div className="mt-5">
          <h3>Register</h3>
          <p className="mt-4">
            You will get the best recommendation for rent house in near of you
            {this.props.match.params.pg}
          </p>
          <TextField
            value={this.state.registerForm.username}
            onChange={(e) => this.inputHandler(e, "username", "registerForm")}
            placeholder="Username"
            className="mt-5"
          />
          <TextField
            value={this.state.registerForm.fullName}
            onChange={(e) => this.inputHandler(e, "fullName", "registerForm")}
            placeholder="Name"
            className="mt-2"
          />
          <TextField
            value={this.state.registerForm.email}
            onChange={(e) => this.inputHandler(e, "email", "registerForm")}
            placeholder="Email"
            className="mt-2"
          />
          <TextField
            value={this.state.registerForm.password}
            onChange={(e) => this.inputHandler(e, "password", "registerForm")}
            placeholder="Password"
            className="mt-2"
            type={this.state.registerForm.showPassword ? "text" : "password"}
          />
          <input type="checkbox" onChange={(e) => this.checkBoxHandler(e, "registerForm")} 
          className="mt-3" name="showPasswordRegister"/>{" "}
          Show Pasword
          <div className="d-flex justify-content-center">
            <ButtonUI
              type="contained"
              onClick={this.registerBtnHandler}
              className="mt-4"
            >
              Register
            </ButtonUI>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-5">
          <h3>Log In</h3>
          <p className="mt-4">
            Welcome back.
            <br /> Please, login to your account
          </p>
          <TextField
            value={this.state.loginForm.username}
            onChange={(e) => this.inputHandler(e, "username", "loginForm")}
            placeholder="Username"
            className="mt-5"
          />
          <TextField
            value={this.state.loginForm.password}
            onChange={(e) => this.inputHandler(e, "password", "loginForm")}
            placeholder="Password"
            className="mt-2"
            type={this.state.loginForm.showPassword ? "text" : "password"}
          />
          <input type="checkbox" onChange={(e) => this.checkBoxHandler(e, "loginForm")}
           className="mt-3" name="showPasswordLogin"/>{" "}
           Show Password
          <div className="d-flex justify-content-center">
            <ButtonUI
              onClick={this.loginBtnHandler}
              type="contained"
              className="mt-4"
            >
              Login
            </ButtonUI>
          </div>
        </div>
      );
    }
  };

  // render button
  render() {
    if (this.props.user.id > 0) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-5">
            <div className="d-flex flex-row">
              <ButtonUI
                className={`auth-screen-btn ${
                  this.state.activePage == "register" ? "active" : null
                }`}
                type="outlined"
                // onClick={() => this.setState({ activePage: "register" })}
              >
                <Link
                style ={{ textDecoration: "none", color: "inherit"}}
                to="/auth/register">
                  Registers
                </Link>
              </ButtonUI>
              <ButtonUI
                className={`ml-3 auth-screen-btn ${
                  this.state.activePage == "login" ? "active" : null
                }`}
                type="outlined"
                // onClick={() => this.setState({ activePage: "login" })}
              >
                <Link
                style ={{ textDecoration: "none", color: "inherit"}}
                to="/auth/login">
                  Login
                </Link>
              </ButtonUI>
            </div>
            {this.props.user.errMsg ? (
              <div className="alert alert-danger mt-3">
                {this.props.user.errMsg}
              </div>
            ) : null}
            {this.renderAuthComponent()}
          </div>
          <div className="col-7">Picture</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  onRegister: registerHandler,
  onLogin: loginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
