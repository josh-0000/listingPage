import React, { useContext } from "react";
import { UserContext } from "src/Context/UserContext";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { UserInterface } from "src/Interfaces/Interfaces";
import { ViewContext } from "src/Context/ViewContext";
import profileImg from "../Assets/profile.png";

function ProfilePage(): JSX.Element {
  const { user, setUser, guestUser } = useContext(UserContext);
  const { changePage } = useContext(ViewContext);
  const logout = () => {
    setUser(guestUser);
    changePage("HOME");
  };
  return (
    <Container>
      <Row className="profilePageRow mt-5 mb-5">
        <Row>
          <Col className="d-flex align-items-center justify-content-center mb-5">
            <img
              src={profileImg}
              className="profilePageImg"
              alt="Profile"
              style={{ width: "200px", height: "200px" }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="profileWidgetContainers mx-auto mt-1 border-0 shadow">
              <Card.Body className="p-5">
                <Container>
                  <Row>
                    <Col className="m-0 p-0 mx-2">
                      <Card className="p-3 bg-light border">
                        <Card.Title>Username</Card.Title>
                        <Card.Text>{user.username}</Card.Text>
                      </Card>
                    </Col>
                    <Col className="m-0 p-0 mx-2">
                      <Card className="p-3 bg-light border">
                        <Card.Title>Email</Card.Title>
                        <Card.Text>{user.email}</Card.Text>
                      </Card>
                    </Col>
                  </Row>
                </Container>
                <Button
                  variant="primary"
                  className="mt-5"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="profileWidgetContainers mx-auto mt-5 border-0 shadow">
              <Card.Body className="p-5">
                <Card className="p-5 bg-light border mx-auto">
                  <Card.Title>Payment 1</Card.Title>
                  <Card.Text>
                    Visa ending in 1234
                    <br />
                  </Card.Text>
                </Card>
                <Button variant="primary" className="mt-5">
                  Add Payment
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="profileWidgetContainers mx-auto mt-5 border-0 shadow">
              <Card.Body className="p-5">
                <Card className="p-5 bg-light border mx-auto">
                  <Card.Title>Address 1</Card.Title>
                  <Card.Text>
                    1234 Main St
                    <br />
                    Anytown, USA 12345
                  </Card.Text>
                </Card>
                <Button variant="primary" className="mt-5">
                  Add Address
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default ProfilePage;
