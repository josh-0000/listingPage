import { useContext } from "react";
import { ListingContext } from "src/Context/ListingContext";
import LCHCategory from "./LCHCategory";

function Results(): JSX.Element {
  const { numPages, currentPage, numResults } = useContext(ListingContext);
  return (
    <div className="results bold">
      {currentPage}-{numPages} of {numResults} results for <LCHCategory />
    </div>
  );
}

export default Results;
