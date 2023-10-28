import { createContext, useState, useEffect } from "react";
import {
  CartInterface,
  UserInterface,
  ContextProviderProps,
} from "../Interfaces/Interfaces";

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

export function UserContextProvider({
  children,
}: ContextProviderProps): JSX.Element {
  const guestUser = {
    userid: 0,
    username: "Guest",
    email: "",
    stripeid: "Guest",
  } as UserInterface;

  let savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  savedUser = savedUser.username !== undefined ? savedUser : guestUser;

  const [user, setUser] = useState(savedUser as UserInterface);
  const [cartList, setCartList] = useState(user.cart as CartInterface[]);
  const [cartSize, setCartSize] = useState(0);
  const [shouldSaveCart, setShouldSaveCart] = useState(false);

  // setting useStates to user attributes
  useEffect(() => {
    if (user.username === "Guest") {
      resetCartList();
    }

    localStorage.setItem("user", JSON.stringify(user));
    if (user.cart) {
      setCartList(user.cart);
    }
  }, [user.userid]);

  // when these change we want to update the user object
  useEffect(() => {
    setUser({ ...user, cart: cartList });
  }, [cartList]);

  // saving user to local storage each time a user attribute changes changes
  useEffect(() => {
    console.log("saving user", user);
    localStorage.setItem("user", JSON.stringify(user));
  }, [user.cart, user.username, user.userid, user.email, user.stripeid]);

  const resetCartList = () => {
    setCartList([] as CartInterface[]);
  };

  const isLoggedIn = user.username === "Guest" ? false : true;

  useEffect(() => {
    saveCartEffectively();
  }, [cartList, shouldSaveCart]);

  useEffect(() => {
    if (!cartList) return;
    setCartSize(cartList.length);
  }, [cartList]);

  const saveCart = async () => {
    const userId = user.userid;
    const cart = cartList;
    const payload = {
      userId: userId,
      cart: cart,
    };
    const res = await fetch("http://localhost:3001/user/save-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log("data", data);
  };

  const saveCartEffectively = async () => {
    if (!shouldSaveCart) return;

    if (user.username !== "Guest") {
      await saveCart();
    }

    setShouldSaveCart(false);
  };

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
    setShouldSaveCart(true);
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
    if (user.username !== "Guest") {
      saveCart();
    }
    setShouldSaveCart(true);
  };

  const removeListingFromCart = (listingid: number) => {
    setCartList(cartList.filter((l) => l.listingid !== listingid));
    if (user.username !== "Guest") {
      saveCart();
    }
    setShouldSaveCart(true);
  };

  console.log("user", user);
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
