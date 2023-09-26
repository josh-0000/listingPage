import React from "react";
import logo from "../Assets/logo192.png";
import { Card } from "react-bootstrap";
import { ListingInterface } from "../Interfaces/Interfaces";
import AddToCart from "./AddToCart";
import RemoveFromCart from "./RemoveFromCart";

interface ListingProps {
  product: ListingInterface;
}

function CartItem({ product }: ListingProps): JSX.Element {
  return (
    <Card className="d-flex flex-row m-0 listing">
      {/* Image on the left */}
      <Card.Img variant="top" src={logo} alt="alt" style={{ width: "200px" }} />

      {/* Card content on the right */}
      <Card.Body className="d-flex flex-column justify-content-center listing-card-body">
        <Card.Title className="bold text-center">
          {product.listingname}
        </Card.Title>
        <Card.Text className="bold text-center">${product.price}</Card.Text>
        <div className="d-flex justify-content-center">
          <RemoveFromCart listing={product} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default CartItem;