import { Row, Col } from "react-bootstrap";
import Sort from "./SortDropdown";
import Filter from "./FilterDropDown";
import Results from "./LCHResults";

function ListingContainerHeader(): JSX.Element {
  return (
    <Row className="no-gutters bg-white border-bottom">
      <Col className="d-flex flex-column justify-content-center ListingContainerHeaderCol no-gutters">
        <Results />
      </Col>
      <Col className="d-flex flex-column justify-content-center ListingContainerHeaderCol no-gutters">
        <div>
          <Sort />
          <Filter />
        </div>
      </Col>
    </Row>
  );
}

export default ListingContainerHeader;
