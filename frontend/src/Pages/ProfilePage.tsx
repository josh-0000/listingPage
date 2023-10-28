import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ViewContext } from "../Context/ViewContext";
import profileImg from "../Assets/profile.png";
import PaymentContainer from "../Components/ProfilePage/Payment/PaymentContainer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AddressContainer from "../Components/ProfilePage/Address/AddressContainer";
import Notification from "../Components/Notification";

function ProfilePage(): JSX.Element {
  const { user, setUser, guestUser } = useContext(UserContext);
  const { changePage } = useContext(ViewContext);
  const stripePromise = loadStripe(
    "pk_live_51NxXILJlUUh6gNa3PgCJfTXLHKU86CvV48xdfnecTbygWkFTceOcPsb1pjvOBJrwLb86lQiC4odXy2Zo0UFypTQI00iauJpMd0"
  );

  const logout = () => {
    setUser(guestUser);
    changePage("HOME");
    Notification("Successfully Logged out");
  };

  const enterCustomerPortal = async () => {
    const stripeid = user.stripeid;
    const response = await fetch(
      "http://localhost:3001/stripe/create-portal-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId: stripeid }), // include it here
      }
    );
    const data = await response.json();
    window.location.href = data.url;
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
                      <Card className="p-3 bg-light shadow-sm">
                        <Card.Title>Name</Card.Title>
                        <Card.Text>{user.username}</Card.Text>
                      </Card>
                    </Col>
                    <Col className="m-0 p-0 mx-2">
                      <Card className="p-3 bg-light shadow-sm">
                        <Card.Title>Email</Card.Title>
                        <Card.Text>{user.email}</Card.Text>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="m-0 p-0 mx-2 mt-3">
                      <Card className="p-3 bg-light shadow-sm">
                        <Card.Title>Phone Number</Card.Title>
                        <Card.Text>{user.phoneNumber}</Card.Text>
                      </Card>
                    </Col>
                  </Row>
                </Container>
                <Container>
                  <Row className="mt-5">
                    <Col className="d-flex justify-content-start">
                      <Button
                        variant="primary"
                        onClick={() => logout()}
                        className="me-2"
                      >
                        Logout
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => enterCustomerPortal()}
                      >
                        Manage Account
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default ProfilePage;
