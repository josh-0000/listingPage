import React, { useContext } from "react";
import { Row, Button } from "react-bootstrap";
import { ListingContext } from "src/Context/ListingContext";

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
    "Accessories",
    "Activewear",
  ];

  function sortByCategory(category: string) {
    setCategoryCategories(category);
  }

  return (
    <Row className="categoriesContainer bg-primary no-gutters">
      {categories.map((category) => (
        <Button
          key={category}
          variant="primary"
          className="category col-1"
          onClick={() => sortByCategory(category)}
        >
          {category}
        </Button>
      ))}
    </Row>
  );
}

export default Categories;
