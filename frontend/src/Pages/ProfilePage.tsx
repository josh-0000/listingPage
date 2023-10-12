import { useContext } from "react";
import { UserContext } from "src/Context/UserContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ViewContext } from "src/Context/ViewContext";
import profileImg from "../Assets/profile.png";
import PaymentContainer from "../Components/ProfilePage/Payment/PaymentContainer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function ProfilePage(): JSX.Element {
  const { user, setUser, guestUser } = useContext(UserContext);
  const { changePage } = useContext(ViewContext);
  const stripePromise = loadStripe(
    "pk_live_51NxXILJlUUh6gNa3PgCJfTXLHKU86CvV48xdfnecTbygWkFTceOcPsb1pjvOBJrwLb86lQiC4odXy2Zo0UFypTQI00iauJpMd0"
  );

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
                      <Card className="p-3 bg-light shadow">
                        <Card.Title>Name</Card.Title>
                        <Card.Text>{user.username}</Card.Text>
                      </Card>
                    </Col>
                    <Col className="m-0 p-0 mx-2">
                      <Card className="p-3 bg-light shadow">
                        <Card.Title>Email</Card.Title>
                        <Card.Text>{user.email}</Card.Text>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="m-0 p-0 mx-2 mt-3">
                      <Card className="p-3 bg-light shadow">
                        <Card.Title>Phone Number</Card.Title>
                        <Card.Text>{user.phoneNumber}</Card.Text>
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
            <Elements stripe={stripePromise}>
              <PaymentContainer />
            </Elements>
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
