import { useContext } from "react";
import { ListingContext } from "../../Context/ListingContext";
import LCHCategory from "./LCHCategory";

function Results(): JSX.Element {
  const { numPages, currentPage, numResults } = useContext(ListingContext);
  return (
    <div className="m-0 p-0">
      {currentPage}-{numPages} of {numResults} results for
    </div>
  );
}

export default Results;
