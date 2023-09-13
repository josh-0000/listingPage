// LCHCategory.tsx
import React, { useContext } from "react";
import { ListingContext } from "src/Context/ListingContext";

function LCHCategory(): JSX.Element {
  const { categoryList } = useContext(ListingContext);

  return (
    <>
      {categoryList.map((category, index) => (
        <span key={index} className="d-inline-block me-1">
          {category}
        </span>
      ))}
    </>
  );
}

export default LCHCategory;
