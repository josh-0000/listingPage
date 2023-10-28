import { useContext } from "react";
import { ListingContext } from "../../Context/ListingContext";
import { Dropdown } from "react-bootstrap";

function Filter(): JSX.Element {
  const { selectedFilters, toggleFilter } = useContext(ListingContext);
  const allFilters = ["Price", "Rating", "Size", "Color", "Brand"];
  return (
    <Dropdown className="filterDropDown">
      <Dropdown.Toggle
        variant="outline-dark mt-2"
        id="filterDropdown"
        size="sm"
      >
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {allFilters.map((filter) => (
          <Dropdown.Item
            key={filter}
            onClick={() => toggleFilter(filter)}
            active={selectedFilters.includes(filter)}
          >
            {filter}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Filter;
