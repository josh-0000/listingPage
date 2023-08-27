import React from "react";

export interface productInterface {
    productName: string, 
    productPrice: number, 
    productRatings: string, 
    productArrivalDate: string,
    productImgSource: string,
}

function Listing(props: { product: productInterface }) {
    const {product} = props; 
    return (
        <div className="card">
            <img className="card-img-top" src="../Assets/SteelersLogo.png" />
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