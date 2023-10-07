import { Card } from "react-bootstrap";
import { CardInterface } from "src/Interfaces/Interfaces";

function Payment(card: { card: CardInterface }): JSX.Element {
  return (
    <Card className="p-5 bg-light border mx-auto mt-3">
      <Card.Title className="mt-3 mb-3">{card.card.brand}</Card.Title>
      <Card.Text>
        {card.card.funding} card ending in {card.card.last4}
        <br />
      </Card.Text>
    </Card>
  );
}

export default Payment;
