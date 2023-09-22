import React, { useContext, useState } from "react";
import { ListingInterface } from "src/Interfaces/Interfaces";
import { UserContext } from "src/Context/UserContext";
import Button from "react-bootstrap/Button";

function RemoveFromCart(props: { listing: ListingInterface }) {
  const { removeListingFromCart } = useContext(UserContext);

  const { listing } = props;
  return (
    <div className="mt-auto">
      {/* Using React Bootstrap's Button component */}
      <Button
        variant="outline-primary"
        className="rounded-pill p-2"
        onClick={() => {
          removeListingFromCart(listing);
        }}
      >
        Remove
      </Button>
    </div>
  );
}

export default RemoveFromCart;
