import React, { useContext, useState } from "react";
import { ListingInterface } from "src/Interfaces/Interfaces";
import { UserContext } from "src/Context/UserContext";
import Button from "react-bootstrap/Button";

function AddToCart(props: { listing: ListingInterface }) {
  const { addListingToCart } = useContext(UserContext);
  const [text, setText] = useState("Add to Cart");
  const changeText = () => {
    setText("+ Added to Cart");
    setTimeout(() => {
      setText("Add to cart");
    }, 1000);
  };

  const { listing } = props;
  return (
    <div className="mt-auto">
      {/* Using React Bootstrap's Button component */}
      <Button
        variant="outline-primary"
        className="rounded-pill p-2"
        onClick={() => {
          addListingToCart(listing);
          changeText();
        }}
      >
        {text}
      </Button>
    </div>
  );
}

export default AddToCart;
