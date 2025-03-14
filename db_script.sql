CREATE DATABASE event_management;

\c event_management

CREATE TABLE event (
    id_event int primary key,
    name varchar(200) not null,
    date_of_event date,
    categorie varchar(100),
    location varchar(100),
    available_of_ticket date
);

CREATE TABLE "user" (
    id_user int primary key,
    first_name varchar(200),
    last_name varchar(200),
    age int,
    email varchar(100)
);

CREATE TABLE reserve (
    id_event int,
    id_user int, 
    constraint fk_event foreign key  (id_event) references event (id_event),
    constraint fk_user foreign key (id_user) references "user" (id_user)
);

CREATE TYPE ticket AS ENUM ('VIP', 'STANDARD', 'EARLY_BIRD');

CREATE TABLE ticket_stock (
    id_ticket int primary key,
    id_event int,
    price float,
    type_of_ticket ticket
);


/*-----Insertion-----*/
INSERT INTO event (id_event, name, date_of_event, categorie, location, available_of_ticket) VALUES
(1, 'Concert de Rock', '2025-05-15', 'Musique', 'Paris - Stade de France', '2025-05-01'),
(2, 'Conférence sur le Marketing Digital', '2025-06-20', 'Conférence', 'Lyon - Palais des Congrès', '2025-06-01'),
(3, 'Festival de Cinéma', '2025-07-10', 'Festival', 'Cannes - Théâtre Lumière', '2025-06-20'),
(4, 'Match de Football', '2025-08-05', 'Sport', 'Marseille - Stade Vélodrome', '2025-07-10');

INSERT INTO "user" (id_user, first_name, last_name, age, email) VALUES
(1, 'Pierre', 'Dupont', 30, 'pierre.dupont@example.com'),
(2, 'Sophie', 'Lemoine', 25, 'sophie.lemoine@example.com'),
(3, 'Julien', 'Martins', 35, 'julien.martins@example.com'),
(4, 'Claire', 'Bernard', 28, 'claire.bernard@example.com');

INSERT INTO reserve (id_event, id_user) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4);

INSERT INTO ticket_stock (id_ticket, id_event, price, type_of_ticket) VALUES
(1, 1, 50.0, 'VIP'),
(2, 1, 30.0, 'STANDARD'),
(3, 2, 200.0, 'EARLY_BIRD'),
(4, 2, 150.0, 'VIP');
