import React, { useContext, useState } from "react";
import { ListingInterface } from "src/Interfaces/Interfaces";
import { UserContext } from "src/Context/UserContext";
import Button from "react-bootstrap/Button";

function Quantity(props: { listing: ListingInterface }) {
  const { listing } = props;
  return (
    <div className="mt-auto">
      {/* Using React Bootstrap's Button component */}
      <Button
        variant="outline-primary"
        className="rounded-pill p-2"
      >
        0
      </Button>
    </div>
  );
}

export default Quantity;
