import React, { useContext, useEffect, useState } from "react";
import { ListingContext } from "../Context/listingContext";

function ListingPageSwitcher(): JSX.Element {
  // use state for the currernt page
  const { currentPage, setCurrentPage } = useContext(ListingContext);

  // use states for the three numbers inside of the page switcher
  const [buttonOne, setButtonOne] = useState(1);
  const [buttonTwo, setButtonTwo] = useState(2);
  const [buttonThree, setButtonThree] = useState(3);
  const { numPages } = useContext(ListingContext);

  // function for First button
  const firstPage = () => {
    setCurrentPage(1);
  };

  // function for Previous button
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

  // function for the Next button
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

  // function for the Last button
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

  // function for first number slot
  const currentPageOptionOne = () => {
    if (buttonOne <= numPages) {
      setCurrentPage(buttonOne);
    }
  };

  // function for second number slot
  const currentPageOptionTwo = () => {
    if (buttonTwo <= numPages) {
      setCurrentPage(buttonTwo);
    }
  };

  // function for third number slot
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

  // Below is css switching for the button of the page the user is currently on
  let buttonOneCss = "btn btn-light";
  let buttonTwoCss = "btn btn-light";
  let buttonThreeCss = "btn btn-light";
  if (currentPage === buttonOne) {
    buttonOneCss = "btn btn-secondary";
  } else if (currentPage === buttonTwo) {
    buttonTwoCss = "btn btn-secondary";
  } else if (currentPage === buttonThree) {
    buttonThreeCss = "btn btn-secondary";
  }

  return (
    <div className="row listingPageSwitcher bg-light">
      <div className="col-md-4 offset-md-4 text-center">
        <div className="row">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-light" onClick={firstPage}>
              First
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={previousPage}
            >
              Prev
            </button>
            <button
              type="button"
              className={buttonOneCss}
              onClick={currentPageOptionOne}
            >
              {buttonOne <= numPages ? buttonOne : ""}
            </button>
            <button
              type="button"
              className={buttonTwoCss}
              onClick={currentPageOptionTwo}
            >
              {buttonTwo <= numPages ? buttonTwo : ""}
            </button>
            <button
              type="button"
              className={buttonThreeCss}
              onClick={currentPageOptionThree}
            >
              {buttonThree <= numPages ? buttonThree : ""}
            </button>
            <button type="button" className="btn btn-light" onClick={nextPage}>
              Next
            </button>
            <button type="button" className="btn btn-light" onClick={lastPage}>
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingPageSwitcher;
