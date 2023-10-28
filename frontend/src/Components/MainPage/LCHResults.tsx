import { useContext } from "react";
import { ListingContext } from "../../Context/ListingContext";
import LCHCategory from "./LCHCategory";

function Results(): JSX.Element {
  const { numPages, currentPage, numResults } = useContext(ListingContext);
  return (
    <div className="results bold text-dark mt-3">
      {currentPage}-{numPages} of {numResults} results for <LCHCategory />
    </div>
  );
}

export default Results;
