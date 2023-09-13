import React, { useContext, useState } from "react";
import { ListingContext } from "src/Context/ListingContext";

function Filter(): JSX.Element {
  const { selectedFilters, toggleFilter } = useContext(ListingContext);
  const allFilters = ["Price", "Rating", "Size", "Color", "Brand"]; // Example filters
  return (
    <div className="dropdown filterDropDown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="filterDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filter
      </button>
      <ul className="dropdown-menu" aria-labelledby="filterDropdown">
        {allFilters.map((filter) => (
          <li key={filter}>
            <button
              className={`dropdown-item
              ${selectedFilters.includes(filter) ? "active" : ""}`}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;
