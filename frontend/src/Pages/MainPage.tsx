import HeaderCategories from "../Components/NavAndFooter/HeaderCategories";
import FeaturedCard from "../Components/MainPage/FeaturedCard";
import ListingContainerHeader from "../Components/MainPage/ListingContainerHeader";
import ListingContainer from "../Components/MainPage/Listings/ListingContainer";
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
