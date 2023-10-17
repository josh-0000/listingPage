import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { ViewContext } from "../../Context/ViewContext";

function CartEmpty(): JSX.Element {
  const { changePage } = useContext(ViewContext);
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <Row className="mt-5 mb-3">
        <h2>No Items In Cart</h2>
      </Row>
      <Row>
        <Button
          variant="primary"
          onClick={() => {
            console.log("Button clicked");
            changePage("HOME");
          }}
        >
          Shop Now
        </Button>
      </Row>
    </Container>
  );
}

export default CartEmpty;
