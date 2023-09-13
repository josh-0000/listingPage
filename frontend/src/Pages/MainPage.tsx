import React from "react";
import HeaderCategories from "../Components/HeaderCategories";
import FeaturedCard from "src/Components/FeaturedCard";
import ListingContainerHeader from "src/Components/ListingContainerHeader";
import ListingContainer from "src/Components/ListingContainer";

function MainPage(): JSX.Element {
  return (
    <>
      <HeaderCategories />
      <div className="row listingsContainer bg-light p-10 m-2">
        <FeaturedCard />
        <ListingContainerHeader />
        <ListingContainer />
      </div>
    </>
  );
}

export default MainPage;
