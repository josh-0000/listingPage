// dataInterfaces.ts

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
  image: string | null;
  addresses: any[] | null;
  cards: any[];
  reviews: any[] | null;
  cart: any[];
  wishlists: any[] | null;
  stripeid: string | null;
}

export interface CartInterface {
  listingid: number | null;
  quantity: number | null;
}

export interface CardInterface {
  id: string | null;
  brand: string | null;
  last4: string | null;
  funding: string | null;
}

