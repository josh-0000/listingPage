import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { ListingInterface } from "src/Interfaces/Interfaces";

const defaultContextValues = {
  currentPage: "HOME",
  changePage: (_value: string) => {
    console.error("toggleFilter function not yet implemented");
  },
  addPayment: false,
  setAddPayment: (_value: boolean) => {
    console.error("toggleFilter function not yet implemented");
  },
};

export const ViewContext = createContext(defaultContextValues);

export function ViewContextProvider({ children }: any) {
  const [currentPage, setCurrentPage] = useState("HOME");
  const [addPayment, setAddPayment] = useState(false);
  const changePage = (page: string) => {
    setCurrentPage(page);
  };

  const contextData = {
    currentPage,
    changePage,
    addPayment,
    setAddPayment,
  };

  return (
    <ViewContext.Provider value={contextData}>{children}</ViewContext.Provider>
  );
}
