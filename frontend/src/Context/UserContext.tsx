import { createContext, useState, useEffect } from "react";
import {
  CartInterface,
  UserInterface,
  CardInterface,
  ContextProviderProps,
  AddressInterface,
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
  removeCard: (_value: string) => {
    console.error("toggleFilter function not yet implemented");
  },
  defaultCard: null as string | null,
  setDefaultCard: (_value: string | null) => {
    console.error("toggleFilter function not yet implemented");
  },
  addressList: [] as AddressInterface[],
  setAddressList: (_value: AddressInterface[]) => {
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
  savedUser.addresses = savedUser.addresses || ([] as AddressInterface[]);
  savedUser.defaultCard = savedUser.defaultCard || null;
  const [user, setUser] = useState(savedUser as UserInterface);
  const [cartList, setCartList] = useState(user.cart);
  const [cardList, setCardList] = useState(user.cards);
  const [cartSize, setCartSize] = useState(0);
  const [addressList, setAddressList] = useState(user.addresses);

  const [defaultCard, setDefaultCard] = useState<string | null>(
    user.defaultCard
  );
  const [shouldSaveCart, setShouldSaveCart] = useState(false);
  const isLoggedIn = user.username === "Guest" ? false : true;

  console.log("user", user);
  useEffect(() => {
    saveCartEffectively();
  }, [cartList, shouldSaveCart]);

  useEffect(() => {
    setCartSize(cartList.length);
  }, [cartList]);

  useEffect(() => {
    if (user.username === "Guest") {
      resetCardList();
      resetCartList();
    }
    localStorage.setItem("user", JSON.stringify(user));
    if (user.cards) {
      setCardList(user.cards);
    }
    if (user.cart) {
      setCartList(user.cart);
    }
  }, [user.userid]);

  useEffect(() => {
    setUser({ ...user, cart: cartList });
  }, [cartList]);

  useEffect(() => {
    setUser({ ...user, cards: cardList });
  }, [cardList]);

  useEffect(() => {
    setUser({ ...user, defaultCard: defaultCard });
  }, [defaultCard]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user.cards, user.cart]);

  const resetCardList = () => {
    setCardList([] as CardInterface[]);
  };

  const resetCartList = () => {
    setCartList([] as CartInterface[]);
  };

  const removeCard = (cardid: string) => {
    const newCardList = cardList.filter((c) => c.id !== cardid);
    setCardList(newCardList);
  };

  const saveCart = async () => {
    const userId = user.userid;
    const cart = cartList;
    console.log("cart", cart);
    console.log("userId", userId);
    console.log("Fetching");
    const payload = {
      userId: userId,
      cart: cart,
    };
    const res = await fetch("http://localhost:3001/save-cart", {
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
    removeCard,
    defaultCard,
    setDefaultCard,
    addressList,
    setAddressList,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}
