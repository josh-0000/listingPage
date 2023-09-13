import React from "react";
import logo from "../Assets/logo192.png";
import { ListingInterface } from "../Interfaces/Interfaces";
import AddToCart from "./AddToCart";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Listing(props: { product: ListingInterface }) {
  const { product } = props;
  return (
    <div className="card text-center flex-column border m-0 listing">
      <img className="card-img-top" alt="alt" src={logo} />
      <div className="card-body d-flex flex-column listing-card-body">
        <h5 className="card-title bold">{product.listingname}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text bold">${product.price}</p>
        <AddToCart listing={product} />
      </div>
    </div>
  );
}

export default Listing;
