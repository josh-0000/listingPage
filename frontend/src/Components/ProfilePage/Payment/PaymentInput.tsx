import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext";
import { ViewContext } from "../../../Context/ViewContext";
import { CardInterface } from "../../../Interfaces/Interfaces";
import Notification from "../../../Components/Notification";

function PaymentInput(): JSX.Element {
  const stripe = useStripe();
  const elements = useElements();
  const { addCardToList, user } = useContext(UserContext);
  const { setAddPayment } = useContext(ViewContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Stripe Error:", error);
    } else {
      try {
        const tokenId = token.id;
        const userId = user.userid;
        const stripeId = user.stripeid;
        const response = await fetch("http://localhost:3001/user/save-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId, userId, stripeId }),
        });
        const result = await response.json();
        const card: CardInterface = result.card;
        setAddPayment(false);
        try {
          addCardToList(card);
          Notification("Card added successfully");
        } catch {
          console.error("There was an error adding the card to the list");
        }
      } catch {
        console.error("There was an error adding the card");
        Notification("There was an error adding the card");
      }
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: "18px",
        lineHeight: "30px",
      },
    },
  };

  return (
    <Card className="p-4 bg-light shadow mx-auto mt-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="mt-3 mb-3">Card Information</Form.Label>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Form.Group>
        <div className="mt-5">
          <Button type="submit" className="" disabled={!stripe}>
            Add
          </Button>
          <Button
            type="button"
            className="mx-2"
            onClick={() => setAddPayment(false)}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default PaymentInput;
