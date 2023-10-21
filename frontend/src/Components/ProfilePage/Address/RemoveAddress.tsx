import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext";
import Notification from "../../../Components/Notification";

function RemoveAddress({ addressid }: { addressid: number }): JSX.Element {
  const { user, removeAddress } = useContext(UserContext);
  const userid = user.userid;
  const deleteAddress = async (addressid: number) => {
    try {
      const response = await fetch(
        "http://localhost:3001/user/delete-address",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ addressid, userid }),
        }
      );
      const result = await response.json();
      if (result.message === "Address deleted successfully") {
        console.log("about to remove address from list");
        removeAddress(addressid);
        Notification("Address deleted successfully");
      }
    } catch {
      console.error("There was an error deleting the address");
      Notification("There was an error deleting the address");
    }
  };
  return (
    <div>
      <Button
        className="mt-3"
        variant="primary"
        onClick={() => deleteAddress(addressid)}
      >
        Remove
      </Button>
    </div>
  );
}

export default RemoveAddress;
