import React, { useContext, useState } from "react";
import { ListingContext } from "src/Context/listingContext";

function Featured(): JSX.Element {
  return (
    <div className="row noPaddingOrMargins">
      <div className="col noPaddingOrMargins">
        <div className="card text-bg-dark featured-card">
          <img className="card-img" alt="..." />
          <div className="card-img-overlay">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small>Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
