import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function Featured(): JSX.Element {
  return (
    <Row className="noPaddingOrMargins featured-row mb-5">
      <Col>
        <Card className="text-bg-dark featured-card">
          <Card.Img variant="top" className="card-img" />
          <Card.ImgOverlay>
            <Card.Title>Featured</Card.Title>
            <Card.Text>Description</Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Col>
    </Row>
  );
}

export default Featured;
