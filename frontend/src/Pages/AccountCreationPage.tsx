import React, { useContext, useState } from "react";
import { ViewContext } from "src/Context/ViewContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function AccountCreationPage(): JSX.Element {
  const { changePage } = useContext(ViewContext);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    rePassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    rePassword: "",
  });

  const [formDataValid, setFormDataValid] = useState({
    email: false,
    username: false,
    password: false,
    rePassword: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formDataValid.email &&
      formDataValid.username &&
      formDataValid.password &&
      formDataValid.rePassword
    ) {
      try {
        const response = await fetch("http://localhost:3001/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Registration was successful:", data);
        } else {
          const data = await response.json();
          console.error("Error registering:", data);
        }
      } catch (error) {
        console.error("There was an error sending the data:", error);
      }
    } else {
      console.log("Form data is invalid");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "email":
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (emailRegex.test(value)) {
          setFormDataValid((prev) => ({ ...prev, email: true }));
          setErrors((prev) => ({ ...prev, email: "" }));
        } else {
          setFormDataValid((prev) => ({ ...prev, email: false }));
          setErrors((prev) => ({
            ...prev,
            email:
              value.length === 0 ? "Email is required" : "Invalid email format",
          }));
        }
        break;

      case "username":
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
        if (usernameRegex.test(value)) {
          setFormDataValid((prev) => ({ ...prev, username: true }));
          setErrors((prev) => ({ ...prev, username: "" }));
        } else {
          setFormDataValid((prev) => ({ ...prev, username: false }));
          setErrors((prev) => ({
            ...prev,
            username:
              value.length === 0
                ? "Username is required"
                : "Invalid username format",
          }));
        }
        break;

      case "password":
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (passwordRegex.test(value)) {
          setFormDataValid((prev) => ({ ...prev, password: true }));
          setErrors((prev) => ({ ...prev, password: "" }));
        } else {
          setFormDataValid((prev) => ({ ...prev, password: false }));
          setErrors((prev) => ({
            ...prev,
            password:
              value.length === 0
                ? "Password is required"
                : "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          }));
        }

        // Check if rePassword still matches the new password value
        if (formData.rePassword.length > 0) {
          if (formData.rePassword !== value) {
            setFormDataValid((prev) => ({ ...prev, rePassword: false }));
            setErrors((prev) => ({
              ...prev,
              rePassword: "Passwords do not match",
            }));
          } else {
            setFormDataValid((prev) => ({ ...prev, rePassword: true }));
            setErrors((prev) => ({ ...prev, rePassword: "" }));
          }
        }
        break;

      case "rePassword":
        setFormDataValid((prev) => ({
          ...prev,
          rePassword: value === formData.password,
        }));

        if (value.length === 0) {
          setErrors((prev) => ({
            ...prev,
            rePassword: "Re-enter password is required",
          }));
        } else if (value !== formData.password) {
          setErrors((prev) => ({
            ...prev,
            rePassword: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, rePassword: "" }));
        }

        break;

      default:
        break;
    }
  };

  return (
    <Container className="text-center account-information-container">
      <Row className="m-4 justify-content-center">
        <h1>Create Account</h1>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="justify-content-center">
          <Form.Label column sm="6" className="mt-2">
            Email
          </Form.Label>
          <Col sm="6" className="mt-2 account-input-field-container">
            <Form.Control
              type="email"
              id="email"
              name="email"
              required
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="justify-content-center">
          <Form.Label column sm="6" className="mt-2">
            Username
          </Form.Label>
          <Col sm="6" className="mt-2 mb-2 account-input-field-container">
            <Form.Control
              type="text"
              id="username"
              name="username"
              required
              onChange={handleInputChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
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
              onChange={handleInputChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="justify-content-center">
          <Form.Label column sm="6" className="mt-2">
            Re-Enter Password
          </Form.Label>
          <Col sm="6" className="mt-2 account-input-field-container">
            <Form.Control
              type="password"
              id="re-enter-password"
              name="rePassword"
              required
              onChange={handleInputChange}
              isInvalid={!!errors.rePassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.rePassword}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="m-4 justify-content-center">
          <Col sm="10">
            <Button type="submit" className="btn btn-primary">
              Create Account
            </Button>
          </Col>
        </Form.Group>

        <Row className="justify-content-center">
          <Form.Text id="passwordHelpBlock" className="text-center">
            Have an Account?
            <Button variant="link" onClick={() => changePage("LOGIN")}>
              Sign In
            </Button>
          </Form.Text>
        </Row>

        <Row className="justify-content-center mt-2">
          <a href="#">Help</a>
        </Row>
      </Form>
    </Container>
  );
}

export default AccountCreationPage;
