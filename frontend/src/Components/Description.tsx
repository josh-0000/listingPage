import React from "react";
import logo from "../Assets/shirts.jpg";
import { Card } from "react-bootstrap";
import { useContext } from "react";
import { ListingInterface } from "../Interfaces/Interfaces";
import AddToCart from "./AddToCart";
import { ListingContext } from "src/Context/ListingContext";

function Description(): JSX.Element {
  const { viewListing } = useContext(ListingContext);
  if (viewListing === null) {
    return <div></div>;
  }
  return (
    <Card className="text-center flex-column m-0 listing">
      <Card.Img variant="top" src={logo} alt="alt" />
      <Card.Body className="d-flex flex-column listing-card-body">
        <Card.Title className="bold">
          {viewListing?.listingname + " "}
          {viewListing?.listingid}
        </Card.Title>
        <Card.Text>{viewListing?.description}</Card.Text>
        <Card.Text className="bold">${viewListing?.price}</Card.Text>
        <AddToCart listing={viewListing} />
      </Card.Body>
    </Card>
  );
}

export default Description;
