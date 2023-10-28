import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CartItem from "../Components/Cart/CartItem";
import CartEmpty from "../Components/Cart/CartEmpty";
import { ListingContext } from "../Context/ListingContext";
import { ListingInterface } from "../Interfaces/Interfaces";
import { loadStripe } from "@stripe/stripe-js";

function CartPage(): JSX.Element {
  const { cartList } = useContext(UserContext);
  const { allListings } = useContext(ListingContext);
  const { user } = useContext(UserContext);
  let subtotal = 0;

  const cartListings = [] as ListingInterface[];
  cartList.forEach((product) => {
    const listing = allListings.find(
      (listing) => listing.listingid === product.listingid
    );
    if (listing) {
      cartListings.push(listing);
      subtotal += Number(listing.price) * product.quantity;
    }
  });

  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  const taxFormatted = tax.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const subtotalFormatted = subtotal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const totalFormatted = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const checkout = async () => {
    const stripeid = user.stripeid;
    const products = cartList;
    try {
      // Make the request to your server to create a new Stripe Checkout session
      const response = await fetch(
        "http://localhost:3001/stripe/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stripeid, products }),
        }
      );
      // Throw an error if the server responds with a status outside of the 200-299 range
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Get the session object from your server"s response
      const session = await response.json();

      // Initialize Stripe
      const stripe = await loadStripe(
        "pk_live_51NxXILJlUUh6gNa3PgCJfTXLHKU86CvV48xdfnecTbygWkFTceOcPsb1pjvOBJrwLb86lQiC4odXy2Zo0UFypTQI00iauJpMd0"
      );

      if (!stripe) {
        throw new Error("Stripe initialization failed.");
      }

      // Use Stripe.js to open Checkout, passing the session ID from your server
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network error, display the localized error message to your customer.
        alert(result.error.message);
      }
    } catch (error) {
      console.error("There was a problem with the payment:", error);
    }
  };

  return (
    <Container className="mb-5">
      <Row className="mb-5 cartContainerRow">
        <Col xs={12} sm={12} md={12} lg={7} className="p-4 mt-5">
          {cartListings.length === 0 ? (
            <CartEmpty />
          ) : (
            cartListings.map((product, index) => (
              <Row key={index} className="mb-2">
                <CartItem product={product} />
              </Row>
            ))
          )}
        </Col>
        <Col xs={12} sm={12} md={12} lg={5} className="p-4 mt-5">
          <Row>
            <Col className="m-0 p-0">
              <Card className="d-flex listing p-4 shadow">
                <Card.Text className="flex-space-between">
                  Subtotal:
                  <span>{subtotalFormatted}</span>
                </Card.Text>
                <Card.Text className="flex-space-between">
                  Tax: <span>{taxFormatted}</span>
                </Card.Text>
                <hr />
                <Card.Text className="flex-space-between">
                  Total: <span>{totalFormatted}</span>
                </Card.Text>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => checkout()}
                >
                  Checkout
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
