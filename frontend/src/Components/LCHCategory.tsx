import React, { useContext } from "react";
import { Badge } from "react-bootstrap";
import { ListingContext } from "src/Context/ListingContext";

function LCHCategory(): JSX.Element {
  const { categoryList } = useContext(ListingContext);

  return (
    <>
      {categoryList.map((category, index) => (
        <Badge key={index} className="d-inline-block me-1">
          {category}
        </Badge>
      ))}
    </>
  );
}

export default LCHCategory;
