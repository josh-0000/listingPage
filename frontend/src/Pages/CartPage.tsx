import React, { useContext } from "react";
import Listing from "src/Components/Listing";
import { UserContext } from "src/Context/UserContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CartItem from "src/Components/CartItem";
import RemoveFromCart from "src/Components/RemoveFromCart";
import NoResultsFound from "src/Components/NoResultsFound";
import CartEmpty from "src/Components/CartEmpty";

function CartPage(): JSX.Element {
  const { cartList } = useContext(UserContext);
  let subtotal = 0;
  cartList.forEach((product) => {
    subtotal += Number(product.price);
    console.log(product.price);
  });
  const tax = subtotal * 0.06;
  const shipping = 5;
  const total = subtotal + tax + shipping;

  const shippingFormatted = shipping.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

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
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={12} lg={7} className="p-5">
          <Row className="bg-dark rounded mb-3">
            <h1 className="text-light">Cart</h1>
          </Row>
          {cartList.length == 0 ? (
            <CartEmpty />
          ) : (
            cartList.map((product, index) => (
              <Row key={index} className="mb-2">
                <CartItem product={product} />
              </Row>
            ))
          )}
        </Col>
        <Col xs={12} sm={12} md={12} lg={5} className="p-5">
          <Row className="bg-dark rounded">
            <h1 className="text-light">Checkout</h1>
          </Row>
          <Row>
            <Col className="m-0 p-0">
              <Card className="d-flex mt-3 listing p-5">
                <Card.Text className="flex-space-between">
                  Subtotal:
                  <span>{subtotalFormatted}</span>
                </Card.Text>
                <Card.Text className="flex-space-between">
                  Shipping:
                  <span>{shippingFormatted}</span>
                </Card.Text>
                <Card.Text className="flex-space-between">
                  Tax: <span>{taxFormatted}</span>
                </Card.Text>
                <hr />
                <Card.Text className="flex-space-between">
                  Total: <span>{totalFormatted}</span>
                </Card.Text>
                <Button variant="primary" className="mt-3">
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
