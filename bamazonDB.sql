DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    
    product_name VARCHAR(50),
    
    department_name VARCHAR(50),
    
    price DECIMAL(10,2),
    
    stock_quantity INTEGER(10),
    
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toothbrush", "Home", 5.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 450.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jersey", "Clothing", 120.00, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone", "Electronics", 700.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox", "Electronics", 350.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Speaker", "Electronics", 60.00, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Clothing", 90.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk", "Home", 160.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tablet", "Electronics", 500.00, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lamp", "Home", 35.00, 60);

SELECT * FROM products;