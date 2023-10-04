import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import {
  CartInterface,
  ListingInterface,
  UserInterface,
} from "src/Interfaces/Interfaces";

const defaultContextValues = {
  user: {} as UserInterface,
  setUser: (_value: UserInterface) => {
    console.error("setUser function not yet implemented");
  },
  cartList: [] as CartInterface[],
  cartSize: 0,
  addListingToCart: (_value: number) => {
    console.error("toggleFilter function not yet implemented");
  },
  isLoggedIn: false,
  removeListingFromCart: (_value: number) => {
    console.error("toggleFilter function not yet implemented");
  },
  removeOneFromCart: (_value: number) => {
    console.error("toggleFilter function not yet implemented");
  },
  guestUser: {} as UserInterface,
};

export const UserContext = createContext(defaultContextValues);

export function UserContextProvider({ children }: any) {
  const guestUser = {
    userid: 0,
    username: "Guest",
    email: "",
    cart: [] as CartInterface[],
  } as UserInterface;

  let savedUser = JSON.parse(localStorage.getItem("user") || "{}");

  savedUser = savedUser.username !== undefined ? savedUser : guestUser;

  savedUser.cart = savedUser.cart || [];

  const [user, setUser] = useState(savedUser as UserInterface);

  console.log("User", user);
  const [cartList, setCartList] = useState(user.cart as CartInterface[]);

  const [cartSize, setCartSize] = useState(0);
  const isLoggedIn = user.username === "Guest" ? false : true;
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    if (user.cart) {
      setCartList(user.cart);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
    user.cart = cartList;
  }, [cartList]);

  const addListingToCart = (listingid: number) => {
    const listing = cartList.find((l) => l.listingid === listingid);
    if (listing) {
      const newItem = {
        listingid: listing.listingid,
        quantity: listing.quantity + 1,
      };
      setCartList([
        ...cartList.map((l) => (l.listingid === listingid ? newItem : l)),
      ]);
    } else {
      const newItem = {
        listingid: listingid,
        quantity: 1,
      };
      setCartList([...cartList, newItem]);
    }
  };

  const removeOneFromCart = (listingid: number) => {
    const listing = cartList.find((l) => l.listingid === listingid);
    if (listing) {
      if (listing.quantity > 1) {
        const updatedItem = {
          listingid: listing.listingid,
          quantity: listing.quantity - 1,
        };
        setCartList([
          ...cartList.map((l) => (l.listingid === listingid ? updatedItem : l)),
        ]);
      } else {
        const filteredCart = cartList.filter((l) => l.listingid !== listingid);
        setCartList(filteredCart);
      }
    }
  };

  const removeListingFromCart = (listingid: number) => {
    setCartList(cartList.filter((l) => l.listingid !== listingid));
  };

  const resetCartList = () => {
    setCartList([]);
  };

  useEffect(() => {
    setCartSize(cartList.length);
  }, [cartList]);

  const contextData = {
    user,
    guestUser,
    isLoggedIn,
    setUser,
    cartList,
    cartSize,
    addListingToCart,
    removeListingFromCart,
    removeOneFromCart,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}
