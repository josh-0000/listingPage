import React from "react";
import logo from "../Assets/logo192.png";
import { Card } from "react-bootstrap";
import { ListingInterface } from "../Interfaces/Interfaces";
import AddToCart from "./AddToCart";

interface ListingProps {
  product: ListingInterface;
}

function Listing({ product }: ListingProps): JSX.Element {
  return (
    <Card className="text-center flex-column border m-0 listing">
      <Card.Img variant="top" src={logo} alt="alt" />
      <Card.Body className="d-flex flex-column listing-card-body">
        <Card.Title className="bold">{product.listingname}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text className="bold">${product.price}</Card.Text>
        <AddToCart listing={product} />
      </Card.Body>
    </Card>
  );
}

export default Listing;
