CREATE TABLE Listings (
  ListingID SERIAL PRIMARY KEY,
  ListingName VARCHAR(255) NOT NULL,
  Price NUMERIC(10, 2) NOT NULL,
  Color VARCHAR(50) NULL,
  Brand VARCHAR(100) NOT NULL,
  Size VARCHAR(50) NOT NULL,
  Sex VARCHAR(50) NOT NULL,
  Category VARCHAR(100) NOT NULL,
  Description TEXT NOT NULL,
  ShippingAddress VARCHAR(255) NOT NULL,
  Discount NUMERIC(5, 2) NULL,
  NumAvailable INT NULL
);

CREATE TABLE ListingImages (
  ImageID SERIAL PRIMARY KEY,
  ListingID INT NOT NULL REFERENCES Listings(ListingID),
  ImageData BYTEA NOT NULL
);

CREATE TABLE Users (
  UserID SERIAL PRIMARY KEY,
  Email VARCHAR(255) NOT NULL UNIQUE,
  ImageData BYTEA NULL,
  Password VARCHAR(255) NOT NULL,
  StripeID VARCHAR(255) NULL,
  DefaultAddress INT NULL
);

CREATE TABLE Addresses (
  AddressID SERIAL PRIMARY KEY,
  UserID INT REFERENCES Users(UserID),
  City VARCHAR(255),
  Country VARCHAR(255),
  Line1 VARCHAR(255),
  Line2 VARCHAR(255) DEFAULT NULL,
  PostalCode VARCHAR(10),
  State VARCHAR(50)
);

CREATE TABLE Transactions (
  TransactionID SERIAL PRIMARY KEY,
  UserID INT REFERENCES Users(UserID),
  ListingID INT REFERENCES Listings(ListingID),
  CardToken BYTEA NOT NULL,
  TimeOfPurchase TIMESTAMPTZ NOT NULL,
  DeliveryAddress VARCHAR(255) NOT NULL,
  TotalPrice NUMERIC(10, 2) NOT NULL,
  UnitPrice NUMERIC(10, 2) NOT NULL,
  Quantity INT NOT NULL,
  OrderStatus VARCHAR(50) NOT NULL,
  ShippingMethod VARCHAR(50) NOT NULL,
  ShippingCost NUMERIC(10, 2) NOT NULL,
  Discount NUMERIC(5, 2) NOT NULL,
  Tax NUMERIC(5, 2) NOT NULL
);

CREATE TABLE Carts (
  CartID SERIAL PRIMARY KEY,
  UserID INT REFERENCES Users(UserID),
  ListingID INT REFERENCES Listings(ListingID),
  Quantity INT NOT NULL
);

CREATE TABLE WishLists (
  WishListID SERIAL PRIMARY KEY,
  UserID INT REFERENCES Users(UserID),
  ListingID INT REFERENCES Listings(ListingID)
);

CREATE TABLE Reviews (
  ReviewID SERIAL PRIMARY KEY,
  UserID INT REFERENCES Users(UserID),
  ListingID INT REFERENCES Listings(ListingID),
  Rating INT NOT NULL CHECK (Rating >= 1 AND Rating <= 5),
  Comment TEXT NULL,
  ReviewDate TIMESTAMPTZ NOT NULL
);
