CREATE DATABASE event_management;

\c event_management

CREATE TABLE event (
    id int primary key,
    name varchar(200) not null,
    date_of_event date,
    categorie varchar(100),
    location varchar(100),
    available_of_ticket date
);

CREATE TABLE "user" (
    id int primary key,
    first_name varchar(200),
    last_name varchar(200),
    age int,
    email varchar(100)
);

CREATE TABLE reservation (
    id_event int,
    id_user int, 
    constraint fk_event foreign key  (id_event) references event (id),
    constraint fk_user foreign key (id_user) references "user" (id)
);

CREATE TYPE ticket AS ENUM ('VIP', 'STANDARD', 'EARLY_BIRD');

CREATE TABLE ticket_stock (
    id_ticket int primary key,
    id_event int,
    price float,
    type_of_ticket ticket
);


/*-----Insertion-----*/
INSERT INTO event (id, name, date_of_event, categorie, location, available_of_ticket) VALUES 
(1, 'Music Concert', '2025-05-15', 'Music', 'New York City', '2025-04-01'),
(2, 'Art Exhibition', '2025-06-10', 'Art', 'London', '2025-05-01'),
(3, 'Tech Conference', '2025-07-20', 'Technology', 'San Francisco', '2025-06-01'),
(4, 'Food Festival', '2025-08-25', 'Food', 'Los Angeles', '2025-07-15'),
(5, 'Comedy Show', '2025-09-05', 'Comedy', 'Chicago', '2025-08-01');

INSERT INTO "user" (id, first_name, last_name, age, email) VALUES 
(1, 'John', 'Doe', 30, 'john.doe@example.com'),
(2, 'Jane', 'Smith', 25, 'jane.smith@example.com'),
(3, 'Michael', 'Johnson', 35, 'michael.johnson@example.com'),
(4, 'Emily', 'Williams', 28, 'emily.williams@example.com'),
(5, 'David', 'Brown', 40, 'david.brown@example.com');

INSERT INTO reservation (id_event, id_user) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO ticket_stock (id_ticket, id_event, price, type_of_ticket) VALUES 
(1, 1, 100.0, 'VIP'),
(2, 1, 50.0, 'STANDARD'),
(3, 2, 25.0, 'EARLY_BIRD'),
(4, 3, 150.0, 'VIP'),
(5, 4, 40.0, 'STANDARD');
