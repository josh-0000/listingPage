import logo from "../Assets/shirts.jpg";
import { Card } from "react-bootstrap";
import { ListingInterface } from "../Interfaces/Interfaces";
import RemoveFromCart from "./RemoveFromCart";
import QuantityControl from "./QuantityControl";

function CartItem({ product }: { product: ListingInterface }): JSX.Element {
  return (
    <Card className="d-flex flex-row m-0 listing shadow">
      <Card.Img variant="top" src={logo} alt="alt" style={{ width: "200px" }} />
      <Card.Body className="d-flex flex-column justify-content-center listing-card-body">
        <Card.Title className="bold text-center">
          {product.listingname + " "}
          {product.listingid}
        </Card.Title>
        <Card.Text className="bold text-center">${product.price}</Card.Text>
        <div className="d-flex justify-content-center mt-4">
          <QuantityControl listingid={product.listingid} />
          <RemoveFromCart listingid={product.listingid} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default CartItem;
