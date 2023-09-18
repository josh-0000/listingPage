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
};

export const UserContext = createContext(defaultContextValues);

export function UserContextProvider({ children }: any) {
  const [cartList, setCartList] = useState([] as ListingInterface[]);
  const [cartSize, setCartSize] = useState(0);
  const [user, setUser] = useState({} as UserInterface);

  console.log(user);
  const addListingToCart = (listing: ListingInterface) => {
    setCartList([...cartList, listing]);
  };

  useEffect(() => {
    setCartSize(cartList.length);
  }, [cartList]);

  const contextData = {
    user,
    setUser,
    cartList,
    cartSize,
    addListingToCart,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}
