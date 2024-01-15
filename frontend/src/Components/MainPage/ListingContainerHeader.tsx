import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Breadcrumb,
} from "react-bootstrap";
import { useContext } from "react";
import { ListingContext } from "src/Context/ListingContext";
import LCHCategory from "./LCHCategory";

function ListingContainerHeader(): JSX.Element {
  const { numPages, currentPage, numResults, categoryList } =
    useContext(ListingContext);

  return (
    <Navbar className="bg-white border-bottom m-0 p-0">
      <Container className="d-flex justify-content-between">
        <Nav>
          <Nav.Item>
            {currentPage}-{numPages} of {numResults} results
          </Nav.Item>
        </Nav>
        <Nav className="ml-auto">
          <NavDropdown
            title="Filters"
            id="basic-nav-dropdown"
            className="ps-3 pe-3"
          >
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Sort" id="basic-nav-dropdown" className="ps-3">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ListingContainerHeader;
