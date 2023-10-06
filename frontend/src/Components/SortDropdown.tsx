import { useState } from "react";
import { Dropdown } from "react-bootstrap";

function Sort(): JSX.Element {
  const [sortOrder, setSortOrder] = useState("");

  return (
    <Dropdown className="sortDropDown">
      <Dropdown.Toggle variant="primary" id="sortDropdown">
        Sort by {sortOrder}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setSortOrder("Featured")}>
          Featured
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOrder("Price Low to high")}>
          Price: Low to High
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOrder("Price High to low")}>
          Price: High to low
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOrder("Avg Customer Review")}>
          Avg. Customer Review
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOrder("Newest Arrivals")}>
          Newest Arrivals
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOrder("Best Sellers")}>
          Best Sellers
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Sort;
