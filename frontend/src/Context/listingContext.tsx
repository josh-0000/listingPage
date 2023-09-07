import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { ListingInterface } from "../Interfaces/Interfaces";

const defaultContextValues = {
  category: "All",
  currentPage: 1,
  setCurrentPage: (_value: number) => {
    console.error("setCurrentPage function not yet implemented");
  },
  setNumPages: (_value: number) => {
    console.error("setNumPages function not yet implemented");
  },
  setNumResults: (_value: number) => {
    console.error("setNumPages function not yet implemented");
  },
  setCategory: (_value: string) => {
    console.error("setCategory function not yet implemented");
  },
  allListings: [] as ListingInterface[],
  numPages: 1,
  productsPerPage: 20,
  numResults: 0,
};

export const ListingContext = createContext(defaultContextValues);

export function ListingContextProvider({ children }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [allListings, setallListings] = useState([] as ListingInterface[]);
  const [numPages, setNumPages] = useState(0);
  const [numResults, setNumResults] = useState(0);
  const [category, setCategory] = useState("All");
  const productsPerPage = 20;

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

  const contextData = {
    setCategory,
    category,
    currentPage,
    setCurrentPage,
    setNumPages,
    setNumResults,
    allListings,
    numPages,
    productsPerPage,
    numResults,
  };

  return (
    <ListingContext.Provider value={contextData}>
      {children}
    </ListingContext.Provider>
  );
}
