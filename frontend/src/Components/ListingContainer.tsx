import { useState, useContext, useEffect } from "react";
import { ListingContext } from "../Context/ListingContext";
import Listing from "./Listing";
import ListingContainerFilters from "./LIstingContainerFilters";
import ListingPageSwitcher from "./ListingPageSwitcher";
import NoResultsFound from "./NoResultsFound";
import { Col, Row, Container } from "react-bootstrap";

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
    <Container as={Col} className="listingPageCol border-top m-2 mb-5">
      <ListingContainerFilters />
      <Row className="g-4 listingRow noPaddingOrMargins">
        {currentProducts.map((product, index) => (
          <Col
            key={index}
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className="p-1 mt-1"
          >
            <Listing product={product} />
          </Col>
        ))}
        {currentProducts.length === 0 ? <NoResultsFound /> : null}
      </Row>
      <ListingPageSwitcher />
    </Container>
  );
}

export default ListingContainer;
