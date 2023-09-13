import React, { useContext, useState, useRef, useEffect } from "react";
import { ListingContext } from "src/Context/ListingContext";

function Search() {
  const { allListings, setCategorySearch } = useContext(ListingContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Type the ref for the search container
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = allListings
    .filter(
      (item) =>
        item.listingname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.color &&
          item.color.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .slice(0, 6);

  const resetSearch = () => {
    setSearchQuery("");
  };

  const printResults = () => {
    setCategorySearch(searchQuery);
    resetSearch();
    setIsFocused(false);
  };

  const sort = (category: string) => {
    setCategorySearch(category);
    resetSearch();
    setIsFocused(false);
  };

  // Click listener to detect outside clicks
  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  // Attach and clean up outside click listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="d-flex w-100" ref={searchContainerRef}>
      <form
        className="d-flex w-75 align-items-center custom-search"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />

        {isFocused && (
          <div className="searchList">
            <div className="list-group">
              {filteredItems.map((item) => (
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    sort(item.listingname);
                    setIsFocused(false);
                  }}
                  key={item.listingid}
                >
                  {item.listingname}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className="btn btn-outline-success"
          type="submit"
          onClick={printResults}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
