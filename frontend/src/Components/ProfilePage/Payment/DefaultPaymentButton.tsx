import { useContext } from "react";
import { Form } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext";
import Notification from "../../../Components/Notification";

function DefaultPaymentButton({ cardid }: { cardid: string }): JSX.Element {
  const { user, setDefaultCard, defaultCard } = useContext(UserContext);
  const stripeId = user.stripeid;
  const makeDefault = async (cardid: string) => {
    try {
      const response = await fetch("http://localhost:3001/user/default-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardid, stripeId }),
      });
      const result = await response.json();
      if (result.message === "Default card set successfully") {
        setDefaultCard(cardid);
        Notification("Default card set successfully");
      } else if (
        result.message ===
        "The provided card was already the default payment. It has now been removed as the default."
      ) {
        setDefaultCard(null);
        Notification(
          "The provided card was already the default payment. It has now been removed as the default."
        );
      }
    } catch {
      console.error("There was an error deleting the card");
    }
  };

  const isDefault = (
    <Form.Check
      type="switch"
      id="custom-switch"
      onChange={() => makeDefault(cardid)}
      checked={true}
    />
  );

  const notDefault = (
    <Form.Check
      type="switch"
      id="custom-switch"
      onChange={() => makeDefault(cardid)}
      checked={false}
    />
  );

  console.log("defaultcard", defaultCard);
  return (
    <div>
      <Form.Group className="mb-3">
        <div className="d-flex align-items-center">
          <Form.Label className="mb-0 me-2">Default Payment</Form.Label>
          {defaultCard === cardid ? isDefault : notDefault}
        </div>
      </Form.Group>
    </div>
  );
}

export default DefaultPaymentButton;
