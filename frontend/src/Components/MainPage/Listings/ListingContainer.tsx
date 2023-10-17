import { useState, useContext, useEffect } from "react";
import { ListingContext } from "../../../Context/ListingContext";
import Listing from "./Listing";
import ListingContainerFilters from "../ListingContainerFilters";
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
    setCurrentPage(1);
    setNumPages(Math.ceil(filtered.length / productsPerPage));
    setNumResults(filtered.length);
  }, [
    categoryList,
    allListings,
    productsPerPage,
    setNumPages,
    setNumResults,
    setCurrentPage,
  ]);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
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
