import React, { useState } from "react";
import Sort from "./sort";
import Filter from "./filter";
import Results from "./results";

function ListingContainerHeader(): JSX.Element {
  return (
    <div className="row ListingContainerHeader noPaddingOrMargins bg-light">
      <div className="col d-flex flex-column">
        <Results />
      </div>
      <div className="col d-flex flex-column">
        <div className="mt-auto">
          <Sort />
          <Filter />
        </div>
      </div>
    </div>
  );
}

export default ListingContainerHeader;
