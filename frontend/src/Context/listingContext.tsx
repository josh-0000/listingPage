import React, { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { productInterface } from "../Components/listing";

const defaultContextValues = {
  currentPage: 1,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentPage: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNumPages: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  allProducts: [] as productInterface[],
  numPages: 1,
  productsPerPage: 20,
};

// simulating fetching
const allProductsFake: productInterface[] = [] as productInterface[];

for (let i = 0; i < 102; i += 1) {
  const product: productInterface = {
    productId: i,
    productName: "product Name " + i,
    productPrice: 100,
    productRatings: "Ratings",
    productArrivalDate: "Arrival Date",
    productImgSource: "src/Assets/SteelersLogo.png",
  };
  allProductsFake.push(product);
}
// end

export const ListingContext = createContext(defaultContextValues);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ListingContextProvider({ children }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allProducts, setAllProducts] = useState(allProductsFake); // function to fetch will update this use state

  // function to fetch data should go here

  const productsPerPage = 20;
  const [numPages, setNumPages] = useState(
    Math.ceil(allProducts.length / productsPerPage)
  );

  const contextData = {
    currentPage,
    setCurrentPage,
    setNumPages,
    allProducts,
    numPages,
    productsPerPage,
  };

  return (
    <ListingContext.Provider value={contextData}>
      {children}
    </ListingContext.Provider>
  );
}
