import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext";
import Payment from "./Payment";
import PaymentInput from "./PaymentInput";
import { ViewContext } from "../../../Context/ViewContext";

function PaymentContainer(): JSX.Element {
  const { cardList } = useContext(UserContext);
  const { addPayment, setAddPayment } = useContext(ViewContext);
  return (
    <Card className="profileWidgetContainers mx-auto mt-5 border-0 shadow">
      <Card.Body className="p-5">
        {cardList?.map((card) => (
          <div key={card.id}>
            <Payment card={card} />
          </div>
        ))}
        {addPayment && <PaymentInput />}
        {!addPayment && (
          <Button
            variant="primary"
            className="mt-5"
            onClick={() => setAddPayment(true)}
          >
            Add Payment
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default PaymentContainer;
