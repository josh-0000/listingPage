import React from "react";
import Listing from "./listing";
import { productInterface } from "./listing";

function ListingContainer() {
    let allProducts: productInterface[] = [] as productInterface[];
    const product: productInterface = {
        productName: "product Name",
        productPrice: 100,
        productRatings: "Ratings",
        productArrivalDate: "Arrival Date",
        productImgSource: "/src/Assets/SteelersLogo.png"
    };

    for ( let i = 0 ; i < 50 ; i += 1) {
        allProducts.push(product);
    }
    
    return (
        <div className="col-12 borderTop">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                    {allProducts.map((product, index) => (
                        <div key={index} className="col">
                            <Listing product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListingContainer;