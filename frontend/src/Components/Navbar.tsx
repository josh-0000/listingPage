import React, { useContext } from "react";
import homeImg from "../Assets/home.png";
import profileImg from "../Assets/profile.png";
import cartImg from "../Assets/cart.png";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Row,
  Button,
} from "react-bootstrap";
import Search from "./NavSearch";
import { UserContext } from "src/Context/UserContext";
import { ViewContext } from "src/Context/ViewContext";

function Navbar(): JSX.Element {
  const { cartSize, isLoggedIn } = useContext(UserContext);
  const { changePage } = useContext(ViewContext);

  const profileElement = isLoggedIn ? (
    <img src={profileImg} className="profile" alt="Profile" />
  ) : (
    <div>Login</div>
  );
  return (
    <Row>
      <BootstrapNavbar
        bg="dark"
        variant="dark"
        sticky="top"
        className="custom-navbar align-items-center"
      >
        <Container fluid className="p-0">
          <BootstrapNavbar.Brand href="adksops" className="text-white">
            Brand
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Collapse id="navbarSupportedContent">
            <Search />
            <Nav className="ml-auto">
              <Nav.Item className="d-flex w-100 align-items-center justify-content-center">
                <Button
                  variant="nav-link"
                  className="white-icon W-100"
                  onClick={() => changePage(isLoggedIn ? "PROFILE" : "LOGIN")}
                >
                  {profileElement}
                </Button>
              </Nav.Item>
              <Nav.Item className="d-flex w-100 align-items-center justify-content-center">
                <Button
                  variant="nav-link"
                  className="text-white white-icon w-100"
                  onClick={() => changePage("CART")}
                >
                  <img src={cartImg} className="cart" alt="Cart" />
                  <p className="cartSize">{cartSize}</p>
                </Button>
              </Nav.Item>
              <Nav.Item className="d-flex w-100 align-items-center justify-content-center">
                <Button
                  variant="nav-link"
                  className="text-white white-icon w-100"
                  onClick={() => changePage("HOME")}
                >
                  <img src={homeImg} className="home" alt="Home" />
                </Button>
              </Nav.Item>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </Row>
  );
}

export default Navbar;
