import React, { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { ListingInterface } from "../Interfaces/Interfaces";

const defaultContextValues = {
  currentPage: 1,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentPage: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNumPages: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  allListings: [] as ListingInterface[],
  numPages: 1,
  productsPerPage: 20,
};

export const ListingContext = createContext(defaultContextValues);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ListingContextProvider({ children }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allListings, setallListings] = useState([] as ListingInterface[]); // function to fetch will update this use state

  const fetchListings = () => {
    fetch("http://localhost:3001/listings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: ListingInterface[]) => {
        setallListings(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // function to fetch data should go here
  console.log(allListings);
  const productsPerPage = 20;
  const [numPages, setNumPages] = useState(
    Math.ceil(allListings.length / productsPerPage)
  );

  const contextData = {
    currentPage,
    setCurrentPage,
    setNumPages,
    allListings,
    numPages,
    productsPerPage,
  };

  return (
    <ListingContext.Provider value={contextData}>
      {children}
    </ListingContext.Provider>
  );
}
