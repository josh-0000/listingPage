import { useContext } from "react";
import { UserContext } from "src/Context/UserContext";
import Button from "react-bootstrap/Button";

function RemoveFromCart(props: { listingid: number }): JSX.Element {
  const { removeListingFromCart } = useContext(UserContext);

  const { listingid } = props;
  return (
    <div className="mt-auto">
      {/* Using React Bootstrap's Button component */}
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
