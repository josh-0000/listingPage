import React, { useState } from "react";
import Sort from "./SortDropdown";
import Filter from "./FilterDropDown";
import Results from "./LCHResults";

function ListingContainerHeader(): JSX.Element {
  return (
    <div className="row ListingContainerHeader noPaddingOrMargins bg-white border">
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
