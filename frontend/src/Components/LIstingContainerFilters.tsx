import React, { useContext } from "react";
import { ListingContext } from "src/Context/ListingContext";

function ListingContainerFilters(): JSX.Element {
  const { selectedFilters, toggleFilter } = useContext(ListingContext);
  let element = null;
  if (selectedFilters.length > 0) {
    element = <p className="d-inline-block me-1 bold">Filters:</p>;
  }
  return (
    <div className="row mb-3 mt-3">
      <div className="col">
        {element}
        {selectedFilters.map((filter, index) => (
          <button
            key={index}
            className="btn btn-secondary m-2 d-inline-block me-1"
            onClick={() => toggleFilter(filter)}
          >
            {filter} x
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListingContainerFilters;
