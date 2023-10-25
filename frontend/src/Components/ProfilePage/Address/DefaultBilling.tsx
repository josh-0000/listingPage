import { useContext } from "react";
import { Form } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext";
import Notification from "../../../Components/Notification";
import { AddressInterface } from "../../../Interfaces/Interfaces";

function DefaultBilling({
  address,
}: {
  address: AddressInterface;
}): JSX.Element {
  const { user, setDefaultBilling, defaultBilling } = useContext(UserContext);
  const stripeid = user.stripeid;
  const makeDefault = async (address: any) => {
    try {
      const response = await fetch(
        "http://localhost:3001/user/default-billing",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address, stripeid }),
        }
      );
      console.log("response", response);
      const result = await response.json();
      console.log("result", result);
      if (result.message === "Default billing address updated successfully") {
        console.log("address", address);
        setDefaultBilling(result.address);
        Notification("Default billing set successfully");
      } else if (result.message === "Billing address cleared") {
        setDefaultBilling(null);
        Notification(
          "The provided Address was already the default billing. It has now been removed as the default."
        );
      }
    } catch {
      console.error("There was an error deleting the Address");
    }
  };

  const isDefault = (
    <Form.Check
      type="switch"
      id="custom-switch"
      onChange={() => makeDefault(address)}
      checked={true}
    />
  );

  const notDefault = (
    <Form.Check
      type="switch"
      id="custom-switch"
      onChange={() => makeDefault(address)}
      checked={false}
    />
  );

  let isEqual = false;
  if (defaultBilling) {
    if (
      defaultBilling.city === address.city &&
      defaultBilling.line1 === address.line1 &&
      defaultBilling.line2 === address.line2 &&
      defaultBilling.postal_code === address.postalCode &&
      defaultBilling.state === address.state &&
      defaultBilling.country === address.country
    ) {
      isEqual = true;
    }
  }

  console.log("DefaultBilling", defaultBilling);
  return (
    <Form.Group>
      <div className="d-flex align-items-center">
        <Form.Label className="mb-0 ml-auto">Billing</Form.Label>
        {isEqual ? isDefault : notDefault}
      </div>
    </Form.Group>
  );
}

export default DefaultBilling;
