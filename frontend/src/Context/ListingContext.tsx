import { createContext, useState, useEffect } from "react";
import {
  ListingInterface,
  ContextProviderProps,
} from "../Interfaces/Interfaces";

const defaultContextValues = {
  categoryList: ["All"],
  currentPage: 1,
  setCurrentPage: (_value: number) => {
    console.error("setCurrentPage function not yet implemented");
  },
  setNumPages: (_value: number) => {
    console.error("setNum Pages function not yet implemented");
  },
  setNumResults: (_value: number) => {
    console.error("setNumResults function not yet implemented");
  },
  setCategoryCategories: (_value: string) => {
    console.error("setCategoryCategories function not yet implemented");
  },
  setCategorySearch: (_value: string) => {
    console.error("setCategorySearch function not yet implemented");
  },
  toggleFilter: (_value: string) => {
    console.error("toggleFilter function not yet implemented");
  },
  selectedFilters: [] as string[],
  allListings: [] as ListingInterface[],
  numPages: 1,
  productsPerPage: 20,
  numResults: 0,
};

export const ListingContext = createContext(defaultContextValues);

export function ListingContextProvider({
  children,
}: ContextProviderProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [allListings, setallListings] = useState([] as ListingInterface[]);
  const [numPages, setNumPages] = useState(0);
  const [numResults, setNumResults] = useState(0);
  const [categoryList, setCategoryList] = useState(["All"]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        // Remove the filter from the list
        return prevFilters.filter((f) => f !== filter);
      } else {
        // Add the filter to the list
        return [...prevFilters, filter];
      }
    });
  };

  const setCategorySearch = (category: string) => {
    const splitCategory = category.split(/\s+/);
    setCategoryList([...splitCategory]);
  };

  const setCategoryCategories = (category: string) => {
    setCategoryList([category]);
  };

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
    toggleFilter,
    selectedFilters,
    setCategoryCategories,
    setCategorySearch,
    categoryList,
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
