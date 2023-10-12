import { Button, Card, Form } from "react-bootstrap";
import { ViewContext } from "../../../Context/ViewContext";
import { useContext } from "react";

function AddressInput(): JSX.Element {
  const { setAddAddress } = useContext(ViewContext);
  return (
    <Card className="p-5 bg-light shadow-sm mx-auto mt-3">
      <Card.Text>
        <Form.Group>
          <Form.Control
            type="text"
            className="mt-3 p-3"
            placeholder="Address Line 1"
          />
          <Form.Control
            type="text"
            className="mt-3 p-3"
            placeholder="Address Line 2"
          />
          <Form.Control type="text" className="mt-3 p-3" placeholder="City" />
          <Form.Control type="text" className="mt-3 p-3" placeholder="State" />
          <Form.Control
            type="text"
            className="mt-3 p-3"
            placeholder="Postal Code"
          />
        </Form.Group>
      </Card.Text>
      <Card.Text>
        <div className="mt-2">
          <Button type="submit" className="">
            Add
          </Button>
          <Button
            type="button"
            className="mx-2"
            onClick={() => setAddAddress(false)}
          >
            Cancel
          </Button>
        </div>
      </Card.Text>
    </Card>
  );
}

export default AddressInput;
