import React, { useContext } from "react";
import Listing from "src/Components/Listing";
import { UserContext } from "src/Context/UserContext";
import { Container, Row, Col } from "react-bootstrap";

function CartPage(): JSX.Element {
  const { cartList } = useContext(UserContext);

  return (
    <Container>
      <p>Cart Page</p>
      <Row>
        {cartList.map((product, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} className="mb-3">
            <Listing product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CartPage;
