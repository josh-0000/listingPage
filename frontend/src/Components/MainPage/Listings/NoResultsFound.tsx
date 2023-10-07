import { Container, Row } from "react-bootstrap";
import searchIcon from "../../../Assets/search.avif";

function NoResultsFound(): JSX.Element {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-center mb-5">
        <img
          src={searchIcon}
          alt="No Results Found Icon"
          className="img-fluid w-50"
        />
      </Row>
      <Row className="justify-content-center">
        <h1 className="mb-3">No Results Found</h1>
      </Row>
      <Row className="justify-content-center">
        <p>Check Keywords or Remove Filters</p>
      </Row>
    </Container>
  );
}

export default NoResultsFound;
