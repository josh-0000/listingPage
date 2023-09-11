import React, { useContext } from "react";
import Listing from "./listing";
import { ListingContext } from "../Context/listingContext";

function ListingContainer(): JSX.Element {
  // used to display items based on current page.
  const {
    allListings,
    currentPage,
    productsPerPage,
    category,
    setNumPages,
    setNumResults,
  } = useContext(ListingContext);

  const filteredListings =
    category !== "All"
      ? allListings.filter(
          (listing) =>
            listing.sex === category ||
            listing.listingname.includes(category) ||
            listing.description.includes(category)
        )
      : allListings;

  setNumPages(Math.ceil(filteredListings.length / productsPerPage));
  setNumResults(filteredListings.length);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredListings.slice(startIndex, endIndex);

  return (
    <div className="col">
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
