import React, { useContext, useState } from "react";
import { ViewContext } from "src/Context/ViewContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "src/Context/UserContext";

function LoginPage(): JSX.Element {
  const { changePage } = useContext(ViewContext);
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setInvalidLogin(false);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setInvalidLogin(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.status === 200 && result.message === "Login successful") {
          // Successfully logged in
          // Here you can handle successful login, maybe set some user state or redirect to a dashboard, etc.
          setUser(result.user);
          setInvalidLogin(false);
          changePage("HOME");
        } else {
          setInvalidLogin(true);
        }
      } catch (error) {
        console.error("There was an error with the login process:", error);
        setInvalidLogin(true);
      }
    } else {
      setInvalidLogin(true);
    }
  };
  return (
    <Container className="text-center account-information-container">
      <Row className="m-4 justify-content-center">
        <h1>Account Login</h1>
      </Row>
      <Form onSubmit={handleLogin}>
        <Form.Group as={Row} className="justify-content-center">
          {invalidLogin && (
            <Col sm="12" className="mb-2">
              <div className="invalid-feedback d-block">
                Username or password not found
              </div>
            </Col>
          )}
          <Form.Label column sm="6" className="mt-2">
            Email
          </Form.Label>
          <Col sm="6" className="mt-2 account-input-field-container">
            <Form.Control
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={emailChange}
            />
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
              value={password}
              onChange={passwordChange}
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
