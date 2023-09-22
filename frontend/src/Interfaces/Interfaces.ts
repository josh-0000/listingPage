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
}

export interface ImageInterface {
  listingid: number;
  imageid: number;
  imagedata: string; // Assuming binary image data is stored as a Base64 string
}

export interface UserInterface {
  userid: number;
  username: string;
  email: string;
  password: string;
}

export interface AddressInterface {
  addressid: number;
  userid: number;
  address: string;
}

export interface CardInterface {
  cardid: number;
  userid: number;
  carddata: string; // Assuming encrypted card data is stored as a Base64 string
}

export interface ReceiptInterface {
  receiptid: number;
  userid: number;
  listingid: number;
  carddata: string; // Assuming encrypted card data is stored as a Base64 string
  email: string;
  timeofpurchase: string; // This should be parsed to a Date in your code
  dateofpurchase: string; // This should be parsed to a Date in your code
  deliveryaddress: string;
}

export interface CartInterface {
  cartid: number;
  userid: number;
  listingid: number;
}

export interface ReviewInterface {
  reviewid: number;
  userid: number;
  listingid: number;
  rating: number; // Should be between 1 and 5
  comment?: string | null; // Optional review comment
  reviewdate: string; // This should be parsed to a Date in your code
}
