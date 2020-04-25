import React from "react";
import ProductCard from "../../components/Cards/ProductCard.tsx";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="d-flex justify-content-center flex-row align-items-center mt-4">
          <h6 className="mx-4 font-weight-bold">PHONE</h6>
          <h6 className="mx-4 font-weight-bold">LAPTOP</h6>
          <h6 className="mx-4 font-weight-bold">TAB</h6>
          <h6 className="mx-4 font-weight-bold">DESKTOP</h6>
        </div>
      </div>
    );
  }
}

export default Home;
