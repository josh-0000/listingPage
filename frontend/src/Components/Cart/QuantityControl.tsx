import { useContext } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { UserContext } from "src/Context/UserContext";

function QuantityControl(props: { listingid: number }): JSX.Element {
  const { listingid } = props;
  const { cartList, addListingToCart, removeOneFromCart } =
    useContext(UserContext);
  const { quantity } = cartList.find((l) => l.listingid === listingid) || {
    quantity: 0,
  };

  return (
    <InputGroup size="sm" className="mx-3" style={{ width: "90px" }}>
      <Button
        size="sm"
        variant="outline-primary"
        onClick={() => removeOneFromCart(listingid)}
      >
        -
      </Button>
      <FormControl value={quantity} style={{ textAlign: "center" }} readOnly />
      <Button
        size="sm"
        variant="outline-primary"
        onClick={() => addListingToCart(listingid)}
      >
        +
      </Button>
    </InputGroup>
  );
}

export default QuantityControl;
