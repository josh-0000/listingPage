import React from "react";

function Categories(): JSX.Element {
  return (
    <div className="row categoriesContainer bg-secondary">
      <div
        className="btn-group-sm btn-group-secondary hideOverflow"
        role="group"
      >
        <button type="button" className="btn btn-secondary">
          Mens
        </button>
        <button type="button" className="btn btn-secondary">
          Womens
        </button>
        <button type="button" className="btn btn-secondary">
          Children
        </button>
        <button type="button" className="btn btn-secondary">
          Jeans
        </button>
        <button type="button" className="btn btn-secondary">
          Shorts
        </button>
        <button type="button" className="btn btn-secondary">
          Shoes
        </button>
        <button type="button" className="btn btn-secondary">
          Socks
        </button>
        <button type="button" className="btn btn-secondary">
          Underwear
        </button>
        <button type="button" className="btn btn-secondary">
          Accessories
        </button>
        <button type="button" className="btn btn-secondary">
          Activewear
        </button>
        <button type="button" className="btn btn-secondary">
          Outerwear
        </button>
        <button type="button" className="btn btn-secondary">
          Formalwear
        </button>
      </div>
    </div>
  );
}

export default Categories;
