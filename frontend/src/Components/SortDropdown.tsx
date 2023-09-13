import React, { useState } from "react";

function Sort(): JSX.Element {
  const [sortOrder, setSortOrder] = useState("");
  return (
    <div className="dropdown sortDropDown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="sortDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Sort by: {sortOrder}
      </button>
      <ul className="dropdown-menu" aria-labelledby="sortDropdown">
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSortOrder("Featured")}
          >
            Featured
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSortOrder("Price Low to high")}
          >
            Price: Low to High
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSortOrder("Price High to low")}
          >
            Price: High to low
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSortOrder("Avg Customer Review")}
          >
            Avg. Customer Review
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSortOrder("Newest Arrivals")}
          >
            Newest Arrivals
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSortOrder("Best Sellers")}
          >
            Best Sellers
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sort;
