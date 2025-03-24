CREATE DATABASE event_management;

\c event_management

CREATE TABLE event (
    id serial primary key,
    name varchar(200) not null,
    date_of_event date,
    categorie varchar(100),
    location varchar(100),
    available_of_ticket date
);

CREATE TABLE users (
    id serial primary key,
    username varchar not null unique,
    email varchar(100) not null unique,
    password varchar not null unique
);

CREATE TABLE reservation (
    id_event int,
    id_user int, 
    constraint fk_event foreign key  (id_event) references event (id),
    constraint fk_user foreign key (id_user) references users (id)
);

CREATE TYPE ticket AS ENUM ('VIP', 'STANDARD', 'EARLY_BIRD');

CREATE TABLE ticket_stock (
    id_ticket int primary key,
    id_event int,
    stock int,
    price float,
    type_of_ticket ticket
);


/*-----Insertion-----*/
INSERT INTO event (name, date_of_event, categorie, location, available_of_ticket) VALUES 
('Music Concert', '2025-05-15', 'Music', 'New York City', '2025-04-01'),
('Art Exhibition', '2025-06-10', 'Art', 'London', '2025-05-01'),
('Tech Conference', '2025-07-20', 'Technology', 'San Francisco', '2025-06-01'),
('Food Festival', '2025-08-25', 'Food', 'Los Angeles', '2025-07-15'),
('Comedy Show', '2025-09-05', 'Comedy', 'Chicago', '2025-08-01');

INSERT INTO ticket_stock (id_ticket, id_event, stock, price, type_of_ticket) VALUES 
(1, 1, 100, 100.0, 'VIP'),
(2, 1, 100, 50.0, 'STANDARD'),
(3, 2, 100, 25.0, 'EARLY_BIRD'),
(4, 3, 100, 150.0, 'VIP'),
(5, 4, 100, 40.0, 'STANDARD');
