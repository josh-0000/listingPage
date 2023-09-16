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
  const { cartSize } = useContext(UserContext);
  const { changePage } = useContext(ViewContext);

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
              <Nav.Item className="w-100">
                <Button
                  variant="link"
                  className="nav-link active text-white white-icon w-100"
                  onClick={() => changePage("HOME")}
                >
                  <img src={homeImg} className="home" alt="Home" />
                </Button>
              </Nav.Item>
              <Nav.Item className="w-100">
                <Button
                  variant="link"
                  className="nav-link active text-white white-icon w-100"
                  onClick={() => changePage("LOGIN")}
                >
                  <img src={profileImg} className="profile" alt="Profile" />
                </Button>
              </Nav.Item>
              <Nav.Item className="d-flex align-items-center w-100">
                <Button
                  variant="link"
                  className="nav-link active text-white white-icon w-100"
                  onClick={() => changePage("CART")}
                >
                  <div className="d-flex flex-column align-items-center">
                    <img src={cartImg} className="cart" alt="Cart" />
                    <p className="cartSize mt-3">{cartSize}</p>
                  </div>
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
