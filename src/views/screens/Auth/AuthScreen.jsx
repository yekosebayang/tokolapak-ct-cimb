import React from "react";
import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import Cookie from 'universal-cookie'
import "./AuthScreen.css";

import {loginHandler} from "../../../redux/actions";
import {connect} from 'react-redux'

const cookieObject = new Cookie()

class AuthScreen extends React.Component {
  componentDidUpdate(){
        if (this.props.user.id){
            cookieObject.set("authData", JSON.stringify(this.props.user))
         }
    }

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <input className="custom-btn2-white mr-2" value="Register"/>
          <input className="custom-btn2-black" value="Login"/>
        </div>
        <div className="row mt-5">
          <div className="col-5">
            <div>
              <h3>Log In</h3>
              <p className="mt-4">
                Welcome back.
                <br /> Please, login to your account
              </p>
              <TextField placeholder="Username" className="mt-5" />
              <TextField placeholder="Password" className="mt-2" />
              <div className="d-flex justify-content-center">
                <ButtonUI type="contained" className="mt-4">
                  Login
                </ButtonUI>
              </div>
            </div>
          </div>
          <div className="col-7">Picture</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
      user: state.userReducer
  }
}
const mapDispatchToProps = {
  loginHandler
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)

