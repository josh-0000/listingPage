import { useContext, useState } from "react";
import { ListingInterface } from "../../../Interfaces/Interfaces";
import { UserContext } from "../../../Context/UserContext";
import Button from "react-bootstrap/Button";

function AddToCart(props: { listing: ListingInterface }): JSX.Element {
  const { listing } = props;
  const { addListingToCart } = useContext(UserContext);
  const [text, setText] = useState("Add to Cart");

  const changeText = () => {
    setText("Added");
    setTimeout(() => {
      setText("Add to cart");
    }, 500);
  };

  return (
    <div className="mt-auto">
      {/* Using React Bootstrap's Button component */}
      <Button
        variant="outline-primary"
        className="rounded-pill p-2"
        onClick={() => {
          addListingToCart(listing.listingid);
          changeText();
        }}
      >
        {text}
      </Button>
    </div>
  );
}

export default AddToCart;
