import React from "react"
import {connect} from "react-redux"
import "./Cart.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"

class Cart extends React.Component {

    componentDidMount() {
        Axios.get(`${API_URL}/cart`, {
            params: {
                userId: this.props.user.id,
                _expand: "product"
            }
        })
        .then((res) =>{
            console.log(res.data)
        })
        .catch((err) =>{
            console.log(err)
        })
}

    render() {
        return (
            <div>
                <div> Cart </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
      user: state.user,
    }
  }
  
  export default connect(mapStatetoProps)(Cart)