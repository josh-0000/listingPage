import { useContext } from "react";
import { Breadcrumb } from "react-bootstrap";
import { ListingContext } from "../../Context/ListingContext";

function LCHCategory(): JSX.Element {
  const { categoryList } = useContext(ListingContext);

  return (
    <>
      {categoryList.map((category, index) => (
        <Breadcrumb key={index} className="d-inline-block me-1">
          <Breadcrumb.Item>{category}</Breadcrumb.Item>
        </Breadcrumb>
      ))}
    </>
  );
}

export default LCHCategory;
