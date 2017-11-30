CREATE DATABASE restaurant;

CREATE TABLE food (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20),
	deliciousness_rating INT NOT NULL,
	is_hot BOOLEAN NOT NULL
);

-- test foods
INSERT INTO food (name, deliciousness_rating, is_hot)
VALUES ('taco', 100, true),
('spring rolls', 100, false),
('honey', 1, false);
