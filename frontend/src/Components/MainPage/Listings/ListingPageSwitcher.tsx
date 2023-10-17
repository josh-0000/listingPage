import { useContext, useEffect, useState } from "react";
import { ListingContext } from "../../../Context/ListingContext";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

function ListingPageSwitcher(): JSX.Element {
  const { currentPage, setCurrentPage } = useContext(ListingContext);
  const [buttonOne, setButtonOne] = useState(1);
  const [buttonTwo, setButtonTwo] = useState(2);
  const [buttonThree, setButtonThree] = useState(3);
  const { numPages } = useContext(ListingContext);

  const firstPage = () => {
    setCurrentPage(1);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % 3 === 0) {
        setButtonOne(buttonOne - 3);
        setButtonTwo(buttonTwo - 3);
        setButtonThree(buttonThree - 3);
      }
    }
  };

  const nextPage = () => {
    if (currentPage !== numPages) {
      setCurrentPage(currentPage + 1);
      if (currentPage % 3 === 0 && currentPage !== numPages) {
        setButtonOne(buttonOne + 3);
        setButtonTwo(buttonTwo + 3);
        setButtonThree(buttonThree + 3);
      }
    }
  };

  const lastPage = () => {
    const buttonToBeLast = numPages % 3;
    if (buttonToBeLast === 1) {
      setButtonOne(numPages);
      setButtonTwo(numPages + 1);
      setButtonThree(numPages + 2);
    } else if (buttonToBeLast === 2) {
      setButtonOne(numPages - 1);
      setButtonTwo(numPages);
      setButtonThree(numPages + 1);
    } else {
      setButtonOne(numPages - 2);
      setButtonTwo(numPages - 1);
      setButtonThree(numPages);
    }
    setCurrentPage(numPages);
  };

  const currentPageOptionOne = () => {
    if (buttonOne <= numPages) {
      setCurrentPage(buttonOne);
    }
  };

  const currentPageOptionTwo = () => {
    if (buttonTwo <= numPages) {
      setCurrentPage(buttonTwo);
    }
  };

  const currentPageOptionThree = () => {
    if (buttonThree <= numPages) {
      setCurrentPage(buttonThree);
    }
  };

  const resetOptions = () => {
    setButtonOne(1);
    setButtonTwo(2);
    setButtonThree(3);
  };

  useEffect(() => {
    if (currentPage === 1) {
      resetOptions();
    }
  }, [currentPage]);

  return (
    <Row className="bg-light p-0 m-5">
      <Col className="d-flex justify-content-center align-items-center">
        <ButtonGroup>
          <Button variant="outline-dark" onClick={firstPage}>
            First
          </Button>
          <Button variant="outline-dark" onClick={previousPage}>
            Prev
          </Button>
          <Button
            variant={currentPage === buttonOne ? "dark" : "outline-dark"}
            onClick={currentPageOptionOne}
          >
            {buttonOne <= numPages ? buttonOne : "."}
          </Button>
          <Button
            variant={currentPage === buttonTwo ? "dark" : "outline-dark"}
            onClick={currentPageOptionTwo}
          >
            {buttonTwo <= numPages ? buttonTwo : "."}
          </Button>
          <Button
            variant={currentPage === buttonThree ? "dark" : "outline-dark"}
            onClick={currentPageOptionThree}
          >
            {buttonThree <= numPages ? buttonThree : "."}
          </Button>
          <Button variant="outline-dark" onClick={nextPage}>
            Next
          </Button>
          <Button variant="outline-dark" onClick={lastPage}>
            Last
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
}

export default ListingPageSwitcher;
