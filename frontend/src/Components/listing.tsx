import React from "react";
import logo from "../Assets/logo192.png";
import { ListingInterface } from "../Interfaces/Interfaces";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Listing(props: { product: ListingInterface }) {
  const { product } = props;
  return (
    <div className="card text-center border-1">
      <img className="card-img-top" alt="alt" src={logo} />
      <div className="card-body">
        <h5 className="card-title bold">{product.listingname}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text bold">${product.price}</p>
      </div>
    </div>
  );
}

export default Listing;
