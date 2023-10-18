import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext";
import Address from "./Address";
import { ViewContext } from "../../../Context/ViewContext";
import AddressInput from "./AddressInput";

function AddressContainer(): JSX.Element {
  const { addressList } = useContext(UserContext);
  console.log(addressList);
  const { addAddress, setAddAddress } = useContext(ViewContext);
  return (
    <Card className="profileWidgetContainers mx-auto mt-5 border-0 shadow">
      <Card.Body className="p-5">
        {addressList?.map((address) => (
          <div key={address.addressid}>
            <Address address={address} />
          </div>
        ))}
        {addAddress && <AddressInput />}
        {!addAddress && (
          <Button
            variant="primary"
            className="mt-5"
            onClick={() => setAddAddress(true)}
          >
            Add Address
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default AddressContainer;
