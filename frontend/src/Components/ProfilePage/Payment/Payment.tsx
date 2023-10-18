import { Card, Col, Row } from "react-bootstrap";
import { CardInterface } from "src/Interfaces/Interfaces";
import DeleteCard from "./DeleteCard";
import DefaultPaymentButton from "./DefaultPaymentButton";

function Payment(card: { card: CardInterface }): JSX.Element {
  const cardid = card.card.id || "0";
  const funding = card.card.funding?.toUpperCase();
  const brand = card.card.brand?.toUpperCase();
  const last4 = card.card.last4;
  return (
    <Card className="p-5 bg-light shadow-sm mx-auto mt-3">
      <Card.Title className="mt-3 mb-3">
        {brand} {funding}
      </Card.Title>
      <Card.Text>
        **** **** **** {last4}
        <br />
      </Card.Text>
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={6}>
            <DeleteCard cardid={cardid} />
          </Col>
          <Col xs={6} className="text-end pt-5">
            <DefaultPaymentButton cardid={cardid} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Payment;
