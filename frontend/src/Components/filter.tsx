import React, { useState } from "react";

function Filter(): JSX.Element {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const allFilters = ["Price", "Rating", "Size", "Color", "Brand"]; // Example filters

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        // Remove the filter from the list
        return prevFilters.filter((f) => f !== filter);
      } else {
        // Add the filter to the list
        return [...prevFilters, filter];
      }
    });
  };

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
