import React, { useContext } from "react";
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
    <div className="row categoriesContainer bg-primary">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="btn btn-primary col-1 category"
          onClick={() => sortByCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Categories;
