import React, { useContext, useState } from "react";
import { ListingContext } from "src/Context/listingContext";

function Sort(): JSX.Element {
  const { numPages, currentPage, numResults } = useContext(ListingContext);
  return (
    <div className="row sortContainer border">
      <div className="col-3">
        <p className="results">
          {currentPage}-{numPages} of {numResults} results
        </p>
      </div>
      <div className="col-7"></div>
      <div className="col-2 sortFormContai">
        <form id="sort-form" className="sort-dropdown sortForm">
          <select id="sort-options" name="sort">
            <option value="disabledselected">Sort By:</option>
            <option value="relevance">Relevance</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="avgCustomerReview">Avg. Customer Review</option>
            <option value="newestArrivals">Newest Arrivals</option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default Sort;
