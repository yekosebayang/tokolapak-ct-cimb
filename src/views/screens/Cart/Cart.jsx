import React from "react"
import {connect} from "react-redux"
import "./Cart.css"

class Cart extends React.Component {
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