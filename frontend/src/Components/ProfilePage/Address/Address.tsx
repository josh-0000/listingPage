import { Card } from "react-bootstrap";
import { AddressInterface } from "../../../Interfaces/Interfaces";

function Address({ address }: { address: AddressInterface }): JSX.Element {
  return (
    <Card className="p-5 bg-light shadow-sm mx-auto mt-3">
      <Card.Title className="mt-3 mb-3">
        {address.line1}
        <br />
        {address.line2}
      </Card.Title>
      <Card.Text>
        {address.city}, {address.state} {address.postalCode}
      </Card.Text>
    </Card>
  );
}

export default Address;
