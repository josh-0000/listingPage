export interface ListingInterface {
  listingid: number;
  listingname: string;
  price: number;
  color: string | null;
  brand: string;
  size: string;
  sex: string;
  category: string;
  description: string;
  shippingaddress: string;
  discount: string;
  images: any[] | null;
  reviews: any[] | null;
}

export interface UserInterface {
  userid: number;
  username: string;
  email: string;
  phoneNumber: string | null;
  image: string | null;
  reviews: any[] | null;
  cart: CartInterface[];
  wishlists: any[] | null;
  stripeid: string | null;
}

export interface CartInterface {
  listingid: number | null;
  quantity: number;
}

export interface ContextProviderProps {
  children: React.ReactNode;
}

