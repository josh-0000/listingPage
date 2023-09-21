import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { ListingInterface, UserInterface } from "src/Interfaces/Interfaces";

const defaultContextValues = {
  user: {} as UserInterface,
  setUser: (_value: UserInterface) => {
    console.error("setUser function not yet implemented");
  },
  cartList: [] as ListingInterface[],
  cartSize: 0,
  addListingToCart: (_value: ListingInterface) => {
    console.error("toggleFilter function not yet implemented");
  },
  isLoggedIn: false,
  removeListingFromCart: (_value: ListingInterface) => {
    console.error("toggleFilter function not yet implemented");
  },
};

export const UserContext = createContext(defaultContextValues);

export function UserContextProvider({ children }: any) {
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const savedCartList = JSON.parse(localStorage.getItem("cartList") || "[]");
  const [cartList, setCartList] = useState(savedCartList as ListingInterface[]);
  const [cartSize, setCartSize] = useState(0);
  const [user, setUser] = useState(savedUser as UserInterface);

  const isLoggedIn = !!Object.keys(user).length;

  useEffect(() => {
    // Persist user data in localStorage
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    // Persist cartList data in localStorage
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);
  console.log(user);
  console.log(isLoggedIn);
  const addListingToCart = (listing: ListingInterface) => {
    setCartList([...cartList, listing]);
  };

  const removeListingFromCart = (listing: ListingInterface) => {
    setCartList(cartList.filter((l) => l.listingid !== listing.listingid));
  };

  useEffect(() => {
    setCartSize(cartList.length);
  }, [cartList]);

  const contextData = {
    user,
    isLoggedIn,
    setUser,
    cartList,
    cartSize,
    addListingToCart,
    removeListingFromCart,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}
