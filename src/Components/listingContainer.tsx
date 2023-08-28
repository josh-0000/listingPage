import React, { useContext } from "react";
import Listing from "./listing";
import { productInterface } from "./listing";
import { ListingContext } from "../Context/listingContext";

function ListingContainer() {
    const { allProducts, currentPage, productsPerPage } = useContext(ListingContext);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = allProducts.slice(startIndex, endIndex);
    return (
        <div className="col-12 borderTop">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                    {currentProducts.map((product, index) => (
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