import React, { useContext, useState } from "react";
import { ListingContext } from "src/Context/ListingContext";
import LCHCategory from "./LCHCategory";

function Results(): JSX.Element {
  const { numPages, currentPage, numResults } = useContext(ListingContext);
  return (
    <div className="mt-auto">
      <p className="results bold">
        {currentPage}-{numPages} of {numResults} results for " <LCHCategory />"
      </p>
    </div>
  );
}

export default Results;
