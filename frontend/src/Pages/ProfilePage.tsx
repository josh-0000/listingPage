import React, { useContext } from "react";
import { UserContext } from "src/Context/UserContext";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { UserInterface } from "src/Interfaces/Interfaces";
import { ViewContext } from "src/Context/ViewContext";

function ProfilePage(): JSX.Element {
  const { user, setUser } = useContext(UserContext);
  const { changePage } = useContext(ViewContext);
  const logout = () => {
    setUser({} as UserInterface);
    changePage("HOME");
  };
  return (
    <Container>
      <Row className="mt-5 bg-dark rounded">
        <Col>
          <h1 className="text-light m-3">Profile</h1>
        </Col>
      </Row>
      <Row className="profilePageRow mt-5 mb-5 ">
        <Col>
          <Card>
            <Card.Header className="bg-dark text-light">
              Manage Account
            </Card.Header>
            <Card.Body>
              <p>
                <span className="bold m-3">Name </span> {user.username}
              </p>
              <p>
                <span className="bold m-3">Email </span> {user.username}
              </p>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header className="bg-dark text-light">Payments</Card.Header>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header className="bg-dark text-light">Addresses</Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
