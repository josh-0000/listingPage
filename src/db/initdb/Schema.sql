-- Create Listings Table
CREATE TABLE Listings (
  ListingID SERIAL PRIMARY KEY,     -- Primary key, auto-increment
  ListingName VARCHAR(255) NOT NULL,-- Product name, required
  Price NUMERIC(10, 2) NOT NULL,    -- Product price, required
  Color VARCHAR(50) NULL,           -- Product color, optional
  Brand VARCHAR(100) NOT NULL,      -- Brand name, required
  Size VARCHAR(50) NOT NULL,        -- Product size, required
  Sex VARCHAR(50) NOT NULL,         -- Target sex, required
  Category VARCHAR(100) NOT NULL,   -- Product category, required
  Description TEXT NOT NULL,        -- Product description, required
  ShippingAddress VARCHAR(255) NOT NULL, -- Shipping address, required
  Discount NUMERIC(5, 2) NOT NULL   -- Discount rate, required
);

-- Create Users Table
CREATE TABLE Users (
  UserID SERIAL PRIMARY KEY,        -- Primary key, auto-increment
  Name VARCHAR(255) NOT NULL,       -- User name, required
  Email VARCHAR(255) NOT NULL UNIQUE-- User email, required and unique
);

-- Create Addresses Table
CREATE TABLE Addresses (
  AddressID SERIAL PRIMARY KEY,     -- Primary key, auto-increment
  UserID INT REFERENCES Users(UserID), -- Foreign key to Users table
  Address VARCHAR(255) NOT NULL     -- User address, required
);

-- Create Cards Table
CREATE TABLE Cards (
  CardID SERIAL PRIMARY KEY,        -- Primary key, auto-increment
  UserID INT REFERENCES Users(UserID), -- Foreign key to Users table
  Card BYTEA NOT NULL               -- Encrypted card data, required
);

-- Create Order Table
CREATE TABLE "Order" (
  OrderID SERIAL PRIMARY KEY,       -- Primary key, auto-increment
  UserID INT REFERENCES Users(UserID), -- Foreign key to Users table
  ListingID INT REFERENCES Listings(ListingID), -- Foreign key to Listings table
  Card BYTEA NOT NULL,              -- Encrypted card data, required
  Email VARCHAR(255) NOT NULL,      -- User email, required
  TimeOfPurchase TIMESTAMPTZ NOT NULL, -- Time of purchase, required
  DateOfPurchase DATE NOT NULL,     -- Date of purchase, required
  DeliveryAddress VARCHAR(255) NOT NULL -- Delivery address, required
);

-- Create Cart Table
CREATE TABLE Cart (
  CartID SERIAL PRIMARY KEY,        -- Primary key, auto-increment
  UserID INT REFERENCES Users(UserID), -- Foreign key to Users table
  ListingID INT REFERENCES Listings(ListingID) -- Foreign key to Listings table
);

-- Create OrderHistory Table
CREATE TABLE OrderHistory (
  HistoryID SERIAL PRIMARY KEY,     -- Primary key, auto-increment
  UserID INT REFERENCES Users(UserID), -- Foreign key to Users table
  OrderID INT REFERENCES "Order"(OrderID) -- Foreign key to Order table
);

CREATE TABLE Reviews (
  ReviewID SERIAL PRIMARY KEY,      -- Primary key, auto-increment
  UserID INT REFERENCES Users(UserID), -- Foreign key to Users table
  ListingID INT REFERENCES Listings(ListingID), -- Foreign key to Listings table
  Rating INT NOT NULL CHECK (Rating >= 1 AND Rating <= 5), -- Rating between 1 and 5, required
  Comment TEXT NULL,                -- Review comment, optional
  ReviewDate TIMESTAMPTZ NOT NULL   -- Date and time when the review was made, required
);
