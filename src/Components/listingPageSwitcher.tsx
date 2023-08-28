import { cpuUsage } from "process";
import React, { useContext, useState } from "react";
import { ListingContext } from "../Context/listingContext"

function ListingPageSwitcher() {
    const {currentPage, setCurrentPage} = useContext(ListingContext);
    const [buttonOne, setButtonOne] = useState(1);
    const [buttonTwo, setButtonTwo] = useState(2);
    const [buttonThree, setButtonThree] = useState(3);
    const { numPages } = useContext(ListingContext);

    const firstPage = () => {
        setButtonOne(1);
        setButtonTwo(2);
        setButtonThree(3);
    };

    const previousPage = () => {
        if (buttonOne != 1) {
            setButtonOne(buttonOne - 3);
            setButtonTwo(buttonTwo - 3);
            setButtonThree(buttonThree - 3);
        }
    };

    const nextPage = () => {
        if (buttonThree != numPages) {
            setButtonOne(buttonOne + 3);
            setButtonTwo(buttonTwo + 3);
            setButtonThree(buttonThree + 3);
        }
    };

    const lastPage = () => {
        setButtonOne(numPages - 2);
        setButtonTwo(numPages - 1);
        setButtonThree(numPages);
    };

    const currentPageOptionOne = () => {
        setCurrentPage(buttonOne);
    };

    const currentPageOptionTwo = () => {
        setCurrentPage(buttonTwo);
    };

    const currentPageOptionThree = () => {
        setCurrentPage(buttonThree);
    };

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
                <div className="row" >
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-light" onClick={firstPage}>First</button>
                        <button type="button" className="btn btn-light" onClick={previousPage}>Prev</button>
                        <button type="button" className={buttonOneCss} onClick={currentPageOptionOne}>{buttonOne}</button>
                        <button type="button" className={buttonTwoCss} onClick={currentPageOptionTwo}>{buttonTwo}</button>
                        <button type="button" className={buttonThreeCss} onClick={currentPageOptionThree}>{buttonThree}</button>
                        <button type="button" className="btn btn-light" onClick={nextPage}>Next</button>
                        <button type="button" className="btn btn-light" onClick={lastPage}>Last</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingPageSwitcher;