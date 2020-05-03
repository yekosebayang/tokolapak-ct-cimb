import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";


import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import AuthScreen from "./views/screens/Auth/AuthScreen";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import AdminDashboard from "./views/screens/admin/AdminDashboard";
import { userKeepLogin, cookieChecker } from "./redux/actions";
import Cart from "./views/screens/Cart/Cart";

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    let cookieResult = cookieObj.get("authData");
    if (cookieResult) {
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker()
    }
}

  renderAdminRoutes = () => {
    if (this.props.user.role == "admin"){
      return(
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
      )
    }
  }

  renderAdminRoutes = () => {
    if (this.props.user.role === "admin") {
      return <Route exact path="/admin/dashboard" component={AdminDashboard} />;
    }
  };

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home/:opt" component={Home} />
            <Route exact path="/auth/:pg" component={AuthScreen} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/cart" component={Cart} />
            {this.renderAdminRoutes()}
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    } else {
      return <div>Loading . . .</div>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

/**
 * PR
 * 1. Add to cart, jika barang double, qty yg akan bertambah ✔️
 * 2. Di Home, ketika click PHONE/LAPTOP/TAB/DESKTOP
 * 3. Di navbar, ketika ketik, secara otomatis filter products
 * 4. Di cart, buat button checkout, serta dengan proses checkout ✔️
 * 5. Ketika confirm checkout, lakukan POST request ke db.json ke transaction ✔️
 *    -> lalu cart harus kosong ✔️
 */
