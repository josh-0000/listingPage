import React, { useContext, useState } from "react";
import { ListingContext } from "src/Context/listingContext";

function Search() {
  const { allListings } = useContext(ListingContext);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredItems = allListings.filter(
    (item) =>
      item.listingname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.color &&
        item.color.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const printResults = () =>
    filteredItems.forEach((item) => console.log(item.listingname));

  return (
    <form
      className="d-flex me-auto w-50 align-items-center"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="form-control me-2 w-100"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={printResults}
      >
        Search
      </button>
    </form>
  );
}

export default Search;
