import { Row, Col, Container } from "react-bootstrap";
import Description from "src/Components/ListingInfoPage/Description";
import ItemInfo from "src/Components/ListingInfoPage/ItemInfo";

function ListingInfoPage(): JSX.Element {
  return (
    <Container className="d-flex mb-5 mt-5">
      <Col className="d-flex justify-content-center align-items-center mt-2 mb-2">
        <Description />
      </Col>
      <Col className="d-flex justify-content-center align-items-center mt-2 mb-2">
        <ItemInfo />
      </Col>
    </Container>
  );
}

export default ListingInfoPage;
