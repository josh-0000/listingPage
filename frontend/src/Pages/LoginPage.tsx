import React, { useContext } from "react";
import { ViewContext } from "src/Context/ViewContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function LoginPage(): JSX.Element {
  const { changePage } = useContext(ViewContext);

  return (
    <Container className="text-center account-information-container">
      <Row className="m-4 justify-content-center">
        <h1>Account Login</h1>
      </Row>
      <Form action="/login" method="POST">
        <Form.Group as={Row} className="justify-content-center">
          <Form.Label column sm="6" className="mt-2">
            Email
          </Form.Label>
          <Col sm="6" className="mt-2 account-input-field-container">
            <Form.Control type="email" id="email" name="email" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="justify-content-center">
          <Form.Label column sm="6" className="mt-2">
            Password
          </Form.Label>
          <Col sm="6" className="mt-2 account-input-field-container">
            <Form.Control
              type="password"
              id="password"
              name="password"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="m-4 justify-content-center">
          <Col sm="10">
            <Button type="submit" className="btn btn-primary">
              Login
            </Button>
          </Col>
        </Form.Group>

        <Row className="justify-content-center">
          <Form.Text id="passwordHelpBlock" className="text-center">
            New to React App?
            <Button
              variant="link"
              onClick={() => changePage("ACCOUNT CREATION")}
            >
              Create Account
            </Button>
          </Form.Text>
        </Row>

        <Row className="justify-content-center mt-2">
          <a href="#">Forgot Password</a>
        </Row>
      </Form>
    </Container>
  );
}

export default LoginPage;
