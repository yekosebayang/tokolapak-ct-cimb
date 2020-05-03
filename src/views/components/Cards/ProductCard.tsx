import React from "react";
import "./ProductCard.css";
import ButtonUI from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux"

interface ProductCardData {
  id?: number;
  productName?: string;
  price?: number;
  review?: number;
  image?: string;
}

type ProductCardProps = {
  data?: ProductCardData;
  className?: string;
};

class ProductCard extends React.Component<ProductCardProps> {
  state= {
    redirect: false
  }
  goto = () => {
    this.setState({ redirect: true });
    // <Link to={`/profile/${this.props.data.id}`} />
    // <Redirect to={`/profile/${this.props.data.id}`} />
  }

  render() {
    const { productName, price, image } = this.props.data;

    if (this.state.redirect){
      return <Redirect to={`/product/${this.props.data.id}`} />
    }

    else{
      return (
        <div onClick={this.goto} className={`product-card d-inline-block ${this.props.className}`}>
          <img
            src={image}
            alt={productName}
            style={{ width: "224px", height: "250px", objectFit: "contain" }}
          />
          <div>
            <p className="mt-3">{productName}</p>
            <h5 style={{ fontWeight: "bolder" }}>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}
            </h5>
            <p className="small">Jakarta Selatan</p>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between mt-2">
            <div>
              <div className="d-flex flex-row align-items-center justify-content-between">
                {/* Render stars dynamically */}
                <FontAwesomeIcon style={{ fontSize: "10px" }} icon={faStar} />
                <FontAwesomeIcon style={{ fontSize: "10px" }} icon={faStar} />
                <FontAwesomeIcon style={{ fontSize: "10px" }} icon={faStar} />
                <FontAwesomeIcon style={{ fontSize: "10px" }} icon={faStar} />
                <FontAwesomeIcon style={{ fontSize: "10px" }} icon={faStar} />
                <small className="ml-2">4.5</small>
              </div>
            </div>
            <ButtonUI
              type="outlined"
              style={{ fontSize: "12px", padding: "4px 8px" }}
            >
              {" "}
              <FontAwesomeIcon icon={faHeart} /> Add to wishlist
            </ButtonUI>
          </div>
        </div>
      );
    }
    
  }
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStatetoProps)(ProductCard)
