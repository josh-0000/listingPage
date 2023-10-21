import { Card, Col, Row } from "react-bootstrap";
import { AddressInterface } from "../../../Interfaces/Interfaces";
import DefaultShipping from "./DefautShipping";
import RemoveAddress from "./RemoveAddress";
function Address({ address }: { address: AddressInterface }): JSX.Element {
  const addressid = address.addressid || 0;
  return (
    <Card className="p-4 bg-light shadow-sm mx-auto mt-3">
      <Card.Title className="mt-3 mb-3">
        {address.line1}
        <br />
        {address.line2}
      </Card.Title>
      <Card.Text>
        {address.city}, {address.state} {address.postalCode}
      </Card.Text>
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={4}>
            <RemoveAddress addressid={addressid} />
          </Col>
          <Col xs={4}>Billing </Col>
          <Col xs={4} className="text-end pt-5">
            <DefaultShipping addressid={addressid} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Address;
