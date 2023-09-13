import React, { useContext, useState } from "react"; // Import useState
import { ListingInterface } from "src/Interfaces/Interfaces";
import { AppContext } from "src/Context/AppContext";

function AddToCart(props: { listing: ListingInterface }) {
  const { addListingToCart } = useContext(AppContext);
  const [text, setText] = useState("Add to Cart"); // Using useState for text
  const changeText = () => {
    setText("+ Added to Cart");
    setTimeout(() => {
      setText("Add to cart");
    }, 1000);
  };

  const { listing } = props;
  return (
    <div className="mt-auto">
      <button
        type="button"
        className="btn addToCart rounded-pill p-2 border"
        onClick={() => {
          addListingToCart(listing);
          changeText();
        }}
      >
        {text}
      </button>
    </div>
  );
}

export default AddToCart;
