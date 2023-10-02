import React from "react";
import { Row, Col } from "react-bootstrap";
import Sort from "./SortDropdown";
import Filter from "./FilterDropDown";
import Results from "./LCHResults";

function ListingContainerHeader(): JSX.Element {
  return (
    <Row className="ListingContainerHeader m-0 rounded">
      <Col className="d-flex flex-column justify-content-center ListingContainerHeaderCol pt-4">
        <Results />
      </Col>
      <Col className="d-flex flex-column justify-content-center ListingContainerHeaderCol pt-2">
        <div>
          <Sort />
          <Filter />
        </div>
      </Col>
    </Row>
  );
}

export default ListingContainerHeader;
