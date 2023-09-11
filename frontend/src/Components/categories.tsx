import React, { useContext } from "react";
import { ListingContext } from "src/Context/listingContext";

function Categories(): JSX.Element {
  const { setCategory, setCurrentPage } = useContext(ListingContext);
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
    setCategory(category);
    setCurrentPage(1);
    console.log(category);
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
