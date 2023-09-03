-- Add More Listings
INSERT INTO Listings (ListingName, Price, Color, Brand, Size, Sex, Category, Description, ShippingAddress, Discount)
VALUES ('Sweatshirt', 29.99, 'Gray', 'BrandA', 'M', 'Unisex', 'Tops', 'Warm and cozy sweatshirt', 'Warehouse1', 0.0),
       ('Shorts', 24.99, 'Green', 'BrandB', 'L', 'Men', 'Bottoms', 'Summer shorts', 'Warehouse2', 5.0),
       ('Skirt', 34.99, 'Pink', 'BrandC', 'S', 'Women', 'Bottoms', 'Stylish pink skirt', 'Warehouse3', 10.0);

-- Add More Users
INSERT INTO Users (Name, Email)
VALUES ('Charlie', 'charlie@example.com'),
       ('Diana', 'diana@example.com');

-- Add More Addresses
INSERT INTO Addresses (UserID, Address)
VALUES (3, '111 Oak St, Springfield'),
       (4, '222 Pine St, Shelbyville');

-- Add More Cards
INSERT INTO Cards (UserID, Card)
VALUES (3, 'some_encrypted_card_data_3'),
       (4, 'some_encrypted_card_data_4');

-- Add More Orders
INSERT INTO "Order" (UserID, ListingID, Card, Email, TimeOfPurchase, DateOfPurchase, DeliveryAddress)
VALUES (3, 1, 'some_encrypted_card_data_3', 'charlie@example.com', current_timestamp, current_date, '111 Oak St, Springfield'),
       (4, 2, 'some_encrypted_card_data_4', 'diana@example.com', current_timestamp, current_date, '222 Pine St, Shelbyville');

-- Add More Items to Cart
INSERT INTO Cart (UserID, ListingID)
VALUES (3, 3),
       (4, 1);

-- Add More OrderHistory
INSERT INTO OrderHistory (UserID, OrderID)
VALUES (3, 3),
       (4, 4);

-- Add More Reviews
INSERT INTO Reviews (UserID, ListingID, Rating, Comment, ReviewDate)
VALUES (3, 1, 3, 'Its okay.', current_timestamp),
       (4, 2, 5, 'I love these jeans!', current_timestamp);
