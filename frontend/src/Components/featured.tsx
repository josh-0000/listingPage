import React, { useContext, useState } from "react";
import { ListingContext } from "src/Context/listingContext";

function Featured(): JSX.Element {
  return (
    <div className="row noPaddingOrMargins featured-row">
      <div className="col">
        <div className="card text-bg-secondary featured-card">
          <img className="card-img" />
          <div className="card-img-overlay">
            <h5 className="card-title">Featured</h5>
            <p className="card-text">Description</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
