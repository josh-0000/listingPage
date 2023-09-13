INSERT INTO Reciept (UserID, ListingID, Card, Email, TimeOfPurchase, DateOfPurchase, DeliveryAddress)
VALUES
(1, 1, 'some_encrypted_card_data_1', 'charlie@example.com', current_timestamp, current_date, '111 Oak St, Springfield'),
(1, 2, 'some_encrypted_card_data_2', 'diana@example.com', current_timestamp, current_date, '222 Pine St, Shelbyville'),
(1, 3, 'some_encrypted_card_data_3', 'emily@example.com', current_timestamp, current_date, '333 Maple St, Anytown');
