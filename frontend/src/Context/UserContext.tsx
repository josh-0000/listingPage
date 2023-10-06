import { createContext, useState, useEffect } from "react";
import {
  CartInterface,
  UserInterface,
  CardInterface,
  ContextProviderProps,
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
  cardList: [] as CardInterface[],
  addCardToList: (_value: CardInterface) => {
    console.error("toggleFilter function not yet implemented");
  },
};

export const UserContext = createContext(defaultContextValues);

export function UserContextProvider({
  children,
}: ContextProviderProps): JSX.Element {
  const guestUser = {
    userid: 0,
    username: "Guest",
    email: "",
  } as UserInterface;

  let savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  savedUser = savedUser.username !== undefined ? savedUser : guestUser;
  savedUser.cart = savedUser.cart || ([] as CartInterface[]);
  savedUser.cards = savedUser.cards || ([] as CardInterface[]);

  const [user, setUser] = useState(savedUser as UserInterface);
  const [cartList, setCartList] = useState(user.cart);
  const [cardList, setCardList] = useState(user.cards);
  const [cartSize, setCartSize] = useState(0);

  const isLoggedIn = user.username === "Guest" ? false : true;

  useEffect(() => {
    setCartSize(cartList.length);
  }, [cartList]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    if (user.cart) {
      setCartList(user.cart);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
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

  const addCardToList = (card: CardInterface) => {
    setCardList([...cardList, card]);
  };

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
    cardList,
    addCardToList,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}
