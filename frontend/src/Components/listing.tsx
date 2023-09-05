import React from "react";
import logo from "../Assets/logo192.png";

export interface productInterface {
  productId: number;
  productName: string;
  productPrice: number;
  productRatings: string;
  productArrivalDate: string;
  productImgSource: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Listing(props: { product: productInterface }) {
  const { product } = props;
  return (
    <div className="card">
      <img className="card-img-top" alt="alt" src={logo} />
      <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>
        <p className="card-text">{product.productPrice} $</p>
        <p className="card-text">{product.productRatings}</p>
        <p className="card-text">{product.productArrivalDate}</p>
      </div>
    </div>
  );
}

export default Listing;
