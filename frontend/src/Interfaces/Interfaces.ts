export interface ListingInterface {
  listingid: number;
  listingname: string;
  price: string;
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
  addresses: any[];
  cards: any[];
  reviews: any[] | null;
  cart: any[];
  wishlists: any[] | null;
  stripeid: string | null;
  defaultCard: string | null;
  defaultAddress: number | null;
  defaultBilling: DefaultBillingInterface | null;
}

export interface CartInterface {
  listingid: number | null;
  quantity: number;
}

export interface CardInterface {
  id: string | null;
  brand: string | null;
  last4: string | null;
  funding: string | null;
}

export interface AddressInterface {
  addressid: number | null;
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postalCode: string | null;
  state: string | null;
}

export interface DefaultBillingInterface {
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}
export interface ContextProviderProps {
  children: React.ReactNode;
}

