import { useContext } from "react";
import { Row, Button, Col } from "react-bootstrap";
import { ListingContext } from "../../Context/ListingContext";

function Categories(): JSX.Element {
  const { setCategoryCategories } = useContext(ListingContext);
  const categories = [
    "All",
    "Men",
    "Women",
    "Boy",
    "Girl",
    "Jeans",
    "Shorts",
    "Shoes",
    "Socks",
    "Underwear",
  ];

  function sortByCategory(category: string) {
    setCategoryCategories(category);
  }

  return (
    <Row className="categoriesContainer bg-primary no-gutters ps-5 pe-5">
      {categories.map((category) => (
        <Col>
          <Button
            key={category}
            variant="primary w-100"
            onClick={() => sortByCategory(category)}
          >
            {category}
          </Button>
        </Col>
      ))}
    </Row>
  );
}

export default Categories;
