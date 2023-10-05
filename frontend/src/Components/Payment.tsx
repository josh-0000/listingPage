import { Button, Card } from "react-bootstrap";

function Payment(card: any) {
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
