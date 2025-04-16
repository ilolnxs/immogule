CREATE TABLE real_estate_objects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    purchase_date DATE NOT NULL,
    purchase_price DECIMAL(15, 2) NOT NULL
);

CREATE TABLE current_values (
    id SERIAL PRIMARY KEY,
    real_estate_object_id INT REFERENCES real_estate_objects(id),
    date DATE NOT NULL,
    value DECIMAL(15, 2) NOT NULL
);

CREATE TABLE income_from_rents (
    id SERIAL PRIMARY KEY,
    real_estate_object_id INT REFERENCES real_estate_objects(id),
    date DATE NOT NULL,
    income DECIMAL(15, 2) NOT NULL
);
