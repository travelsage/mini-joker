CREATE DATABASE registration_db;

USE registration_db;

CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    departure DATETIME NOT NULL,
    `return` DATETIME NOT NULL,
    destinations VARCHAR(255) NOT NULL,
    package VARCHAR(50) NOT NULL,
    terms TINYINT NOT NULL
);
