import React from "react";
import { Row, Col } from "react-bootstrap";
import Sort from "./SortDropdown";
import Filter from "./FilterDropDown";
import Results from "./LCHResults";

function ListingContainerHeader(): JSX.Element {
  return (
    <Row className="ListingContainerHeader border-bottom m-0">
      <Col className="d-flex flex-column">
        <Results />
      </Col>
      <Col className="d-flex flex-column">
        <div className="mt-auto">
          <Sort />
          <Filter />
        </div>
      </Col>
    </Row>
  );
}

export default ListingContainerHeader;
