import React from "react";
import HeaderCategories from "../Components/HeaderCategories";
import FeaturedCard from "src/Components/FeaturedCard";
import ListingContainerHeader from "src/Components/ListingContainerHeader";
import ListingContainer from "src/Components/ListingContainer";
import { Row } from "react-bootstrap";

function MainPage(): JSX.Element {
  return (
    <>
      <HeaderCategories />
      <Row className="listingsContainer bg-light p-10 m-2">
        <FeaturedCard />
        <ListingContainerHeader />
        <ListingContainer />
      </Row>
    </>
  );
}

export default MainPage;
