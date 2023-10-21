import { useContext } from "react";
import { Form } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext";
import Notification from "../../../Components/Notification";
import { AddressInterface } from "src/Interfaces/Interfaces";

function DefaultShipping({ addressid }: { addressid: number }): JSX.Element {
  const { user, setDefaultShipping, defaultShipping } = useContext(UserContext);
  const userid = user.userid;
  const makeDefault = async (addressid: number) => {
    try {
      const response = await fetch(
        "http://localhost:3001/user/default-address",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ addressid, userid }),
        }
      );
      const result = await response.json();
      if (result.message === "Default address set successfully") {
        setDefaultShipping(addressid);
        Notification("Default address set successfully");
      } else if (
        result.message ===
        "The provided address was already the default. It has now been removed."
      ) {
        setDefaultShipping(null);
        Notification(
          "The provided Address was already the default. It has now been removed as the default."
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
      onChange={() => makeDefault(addressid)}
      checked={true}
    />
  );

  const notDefault = (
    <Form.Check
      type="switch"
      id="custom-switch"
      onChange={() => makeDefault(addressid)}
      checked={false}
    />
  );

  console.log("defaultShipping", defaultShipping);
  return (
    <Form.Group>
      <div className="d-flex align-items-center">
        <Form.Label className="mb-0 ml-auto">Default</Form.Label>
        {defaultShipping === addressid ? isDefault : notDefault}
      </div>
    </Form.Group>
  );
}

export default DefaultShipping;
