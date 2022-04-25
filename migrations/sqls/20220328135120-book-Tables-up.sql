 CREATE TABLE bookTables (
    id SERIAL PRIMARY KEY,
    Title VARCHAR(100) NOT NULL, 
    Author VARCHAR(100) NOT NULL, 
    Total_pages INTEGER NOT NULL,
    Book_type VARCHAR(100) NOT NULL,
    Summary TEXT
);
