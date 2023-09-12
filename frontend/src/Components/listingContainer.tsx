import React, { useState, useContext, useEffect } from "react";
import { ListingContext } from "../Context/listingContext";
import Listing from "./listing";

function ListingContainer(): JSX.Element {
  const {
    allListings,
    currentPage,
    productsPerPage,
    categoryList,
    setNumPages,
    setNumResults,
    setCurrentPage,
  } = useContext(ListingContext);

  const [filteredListings, setFilteredListings] = useState(allListings);

  useEffect(() => {
    let filtered = [...allListings];
    if (categoryList[0] !== "All") {
      categoryList.forEach((category) => {
        filtered = filtered.filter(
          (listing) =>
            listing.sex.includes(category) ||
            listing.listingname
              .toLowerCase()
              .includes(category.toLowerCase()) ||
            listing.description
              .toLowerCase()
              .includes(category.toLowerCase()) ||
            listing.brand.toLowerCase().includes(category.toLowerCase()) ||
            listing.category.toLowerCase().includes(category.toLowerCase()) ||
            (listing.color &&
              listing.color.toLowerCase().includes(category.toLowerCase()))
        );
      });
    }

    setFilteredListings(filtered);

    // Everytime the category is changed we want to set the page to 1
    setCurrentPage(1);
    // Setting the number of pages for the filtered listings
    setNumPages(Math.ceil(filtered.length / productsPerPage));
    // Setting the number of results for the filtered listings
    setNumResults(filtered.length);
  }, [
    categoryList,
    allListings,
    productsPerPage,
    setNumPages,
    setNumResults,
    setCurrentPage,
  ]);

  // Setting the start index of the splice based on the current page and the number of prodects per page
  const startIndex = (currentPage - 1) * productsPerPage;
  // Setting the end index of the splice based on the start index and the products per page.
  const endIndex = startIndex + productsPerPage;

  // Products being displayed currently
  const currentProducts = filteredListings.slice(startIndex, endIndex);

  return (
    <div className="col listingPageCol m-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 listingRow noPaddingOrMargins">
        {currentProducts.map((product, index) => (
          <div key={index} className="col px-1 mt-2">
            <Listing product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListingContainer;
