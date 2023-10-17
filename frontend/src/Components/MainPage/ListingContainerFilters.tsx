import { useContext } from "react";
import { ListingContext } from "../../Context/ListingContext";
import { Row, Col, Button, CloseButton } from "react-bootstrap";

function ListingContainerFilters(): JSX.Element {
  const { selectedFilters, toggleFilter } = useContext(ListingContext);
  let element = null;
  if (selectedFilters.length > 0) {
    element = <p className="d-inline-block me-1 bold">Filters:</p>;
  }

  return (
    <Row className="mb-3 mt-3">
      <Col>
        {element}
        {selectedFilters.map((filter, index) => (
          <Button
            key={index}
            variant="secondary"
            className="m-2 d-inline-block me-1"
            onClick={() => toggleFilter(filter)}
          >
            <div className="d-inline-block bold px-1">{filter}</div>
            <CloseButton />
          </Button>
        ))}
      </Col>
    </Row>
  );
}

export default ListingContainerFilters;
