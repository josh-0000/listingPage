import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Button from "react-bootstrap/Button";

function RemoveFromCart(props: { listingid: number }): JSX.Element {
  const { removeListingFromCart } = useContext(UserContext);

  const { listingid } = props;
  return (
    <div className="mt-auto">
      <Button
        variant="outline-primary"
        className="rounded-pill p-2"
        onClick={() => {
          removeListingFromCart(listingid);
        }}
      >
        Remove
      </Button>
    </div>
  );
}

export default RemoveFromCart;
