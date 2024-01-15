import { useContext } from "react";
import { Breadcrumb } from "react-bootstrap";
import { ListingContext } from "../../Context/ListingContext";

function LCHCategory(): JSX.Element {
  const { categoryList } = useContext(ListingContext);

  return (
    <div className="m-0 p-0">
      {categoryList.map((category, index) => (
        <Breadcrumb key={index} className="d-inline-block">
          <Breadcrumb.Item>{category}</Breadcrumb.Item>
        </Breadcrumb>
      ))}
    </div>
  );
}

export default LCHCategory;
