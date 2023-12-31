import logo from "../../../Assets/shirts.jpg";
import { Card } from "react-bootstrap";
import { ListingInterface } from "../../../Interfaces/Interfaces";
import { ViewContext } from "../../../Context/ViewContext";
import { useContext } from "react";
import AddToCart from "./AddToCart";
import { ListingContext } from "../../../Context/ListingContext";

interface ListingProps {
  product: ListingInterface;
}

function Listing({ product }: ListingProps): JSX.Element {
  const { changePage } = useContext(ViewContext);
  const { setViewListingDescription } = useContext(ListingContext);
  return (
    <Card className="text-center flex-column m-0 listing shadow-sm">
      <Card.Img
        variant="top"
        src={logo}
        alt="alt"
        onClick={() => {
          setViewListingDescription(product);
          changePage("DESCRIPTION");
        }}
      />
      <Card.Body className="d-flex flex-column listing-card-body">
        <Card.Title className="bold">
          {product.listingname + " "}
          {product.listingid}
        </Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text className="bold">${product.price}</Card.Text>
        <AddToCart listing={product} />
      </Card.Body>
    </Card>
  );
}

export default Listing;
