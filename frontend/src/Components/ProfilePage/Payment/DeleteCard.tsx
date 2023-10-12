import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "src/Context/UserContext";

function DeleteCard({ cardid }: { cardid: string }): JSX.Element {
  const { user, removeCard } = useContext(UserContext);
  const stripeId = user.stripeid;
  const deleteCard = async (cardid: string) => {
    try {
      const response = await fetch("http://localhost:3001/delete-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardid, stripeId }),
      });
      const result = await response.json();
      console.log(result);
      console.log(result.status);
      console.log(result.message);
      if (result.message === "Card deleted successfully") {
        console.log("about to remove card from list");
        removeCard(cardid);
      }
    } catch {
      console.error("There was an error deleting the card");
    }
  };
  return (
    <div>
      <Button
        className="mt-3"
        variant="primary"
        onClick={() => deleteCard(cardid)}
      >
        Remove
      </Button>
    </div>
  );
}

export default DeleteCard;
