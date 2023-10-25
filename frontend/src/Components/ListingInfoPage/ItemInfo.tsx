import AddToCart from "../MainPage/Listings/AddToCart";
import { useContext, useState } from "react";
import { ListingContext } from "src/Context/ListingContext";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { UserContext } from "src/Context/UserContext";
import "../../Styles/App.css";

function ItemInfo(): JSX.Element {
  const { viewListing } = useContext(ListingContext);
  const [text, setText] = useState("Add to Cart");
  const { addListingToCart } = useContext(UserContext);

  const changeText = () => {
    setText("Added");
    setTimeout(() => {
      setText("Add to cart");
    }, 500);
  };

  if (viewListing === null) {
    return <div></div>;
  }
  return (
    <Container className="m-5">
      <Row className="d-flex justify-content-center align-items-center">
        <Col>
          <Card className="d-flex listing view-listing-card shadow justify-content-center align-items-center">
            <Card.Title className="flex-space-between">
              <span>{viewListing.listingname}</span>
            </Card.Title>
            <Card.Subtitle>
              <span>{viewListing.description}</span>
            </Card.Subtitle>
            <Card.Text className="flex-space-between">
              <span>${viewListing.price}</span>
            </Card.Text>
            <Card.Text className="flex-space-between">
              <span>{viewListing.reviews}</span>
            </Card.Text>
            <hr className="w-100" />
            <Button
              variant="outline-primary"
              className="rounded-pill p-2 w-50 mt-3"
              onClick={() => {
                addListingToCart(viewListing.listingid);
                changeText();
              }}
            >
              {text}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ItemInfo;
