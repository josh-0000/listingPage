import React from "react";
import logo from "../Assets/logo192.png";
import { ListingInterface } from "../Interfaces/Interfaces";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Listing(props: { product: ListingInterface }) {
  const { product } = props;
  return (
    <div className="card">
      <img className="card-img-top" alt="alt" src={logo} />
      <div className="card-body">
        <h5 className="card-title">{product.listingname}</h5>
        <p className="card-text">{product.price} $</p>
      </div>
    </div>
  );
}

export default Listing;
