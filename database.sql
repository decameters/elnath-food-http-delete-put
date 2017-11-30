CREATE DATABASE restaurant;

CREATE TABLE food (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20),
	deliciousness_rating INT,
	is_hot BOOLEAN
);

-- test food
INSERT INTO food (name, deliciousness_rating, is_hot)
VALUES ('taco', 100, true);