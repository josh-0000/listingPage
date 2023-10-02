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
  addresses: any[] | null;
  cards: any[] | null;
  reviews: any[] | null;
  cart: any[] | null;
}

export interface CartInterface {
  listingid: number;
  quantity: number;
}
