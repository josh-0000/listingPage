#!/bin/bash

DATABASE_NAME="listings"
USER="jg"

# List of SQL files in the order they should be executed
FILES=(
  "/docker-entrypoint-initdb.d/schema/Schema.sql"
  "/docker-entrypoint-initdb.d/data/Users.sql"
  "/docker-entrypoint-initdb.d/data/Listings.sql"
  "/docker-entrypoint-initdb.d/data/Addresses.sql"
  "/docker-entrypoint-initdb.d/data/Carts.sql"
  "/docker-entrypoint-initdb.d/data/Transactions.sql"
  "/docker-entrypoint-initdb.d/data/Reviews.sql"
)

# Execute each SQL file
for file in "${FILES[@]}"; do
    echo "Executing $file..."
    psql -U "$USER" -d "$DATABASE_NAME" -f "$file"
    if [ $? -ne 0 ]; then
        echo "Error executing $file"
        exit 1
    fi
    echo "$file executed successfully."
done

echo "All SQL files executed successfully."
