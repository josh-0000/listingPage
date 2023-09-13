import React, { useContext, useState } from "react";
import { ListingContext } from "src/Context/ListingContext";

function Featured(): JSX.Element {
  return (
    <div className="row noPaddingOrMargins featured-row mb-5">
      <div className="col">
        <div className="card text-bg-dark featured-card">
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
