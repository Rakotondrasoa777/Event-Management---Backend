DROP DATABASE IF EXISTS event_management;
CREATE DATABASE event_management;

\c event_management

CREATE TABLE event (
    id serial primary key,
    title varchar(200) not null,
    date_of_event date,
    categorie varchar(100),
    description varchar,
    location varchar(100),
    available_of_ticket date,
    img varchar
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
    ticket_number int,
    ticket_type ticket,
    date_reservation date,
    total_price_reservation float,
    constraint fk_event foreign key  (id_event) references event (id),
    constraint fk_user foreign key (id_user) references users (id)
);

CREATE TYPE ticket AS ENUM ('VIP', 'STANDARD', 'EARLY_BIRD');

CREATE TABLE ticket_stock (
    id serial primary key,
    id_event int,
    stock int,
    price float,
    type_of_ticket ticket,
    constraint fk_event foreign key (id_event) references event (id)
);

alter table ticket_stock drop constraint fk_event, add constraint fk_event foreign key (id_event) references event (id) on delete cascade

/*-----Insertion-----*/
INSERT INTO event (title, date_of_event, categorie, description, location, available_of_ticket, img) VALUES 
('Music Concert', '2025-05-15', 'Music', 'A live performance featuring world-renowned musicians. The concert will include a variety of genres, from classical to contemporary, offering a unique experience for music lovers of all kinds.', 'New York City', '2025-04-01', 'https://t3.ftcdn.net/jpg/02/08/48/72/240_F_208487214_yYZIU5xeXEBf58bOCahhpbx5RLzUglWU.jpg'),
('Art Exhibition', '2025-06-10', 'Art', 'An exciting showcase of contemporary art from emerging and established artists. The exhibition will explore themes such as identity, culture, and technology, with works in various mediums including painting, sculpture, and digital art.', 'London', '2025-05-01', 'https://as2.ftcdn.net/v2/jpg/04/39/50/23/1000_F_439502320_cqDdMLEndcOdLMm6ekyDmI5slUht2ZSU.jpg'),
('Tech Conference', '2025-07-20', 'Technology', 'A global gathering of tech enthusiasts, innovators, and industry leaders. The conference will feature keynote speakers, panel discussions, and hands-on workshops covering the latest trends in artificial intelligence, blockchain, and cybersecurity.', 'San Francisco', '2025-06-01', 'https://t3.ftcdn.net/jpg/08/95/85/06/240_F_895850642_NiGp7siX13o7T3FXqUbgXpvaFyni4NM8.jpg'),
('Food Festival', '2025-08-25', 'Food', 'A celebration of global cuisine, with food stalls, cooking demonstrations, and tasting events from top chefs around the world. Enjoy a diverse range of dishes, from street food to gourmet creations, all in one vibrant location.', 'Los Angeles', '2025-07-15', 'https://t4.ftcdn.net/jpg/03/18/31/85/240_F_318318523_EFbcjYCMzW44nro5rS0yJwOrojwk43i8.jpg'),
('Comedy Show', '2025-09-05', 'Comedy', 'A night of laughter with some of the funniest stand-up comedians in the industry. The show will feature a mix of both well-known comedians and fresh talent, providing an evening full of entertainment and humor.', 'Chicago', '2025-08-01', 'D:\Examen-Web3-NextJS\Tapakila_NextJS\public\cardImage\Comedy Show.jpg');

INSERT INTO ticket_stock (id_event, stock, price, type_of_ticket) VALUES 
(11, 100, 100.0, 'VIP'),
(11, 100, 50.0, 'STANDARD'),
(12, 100, 25.0, 'EARLY_BIRD'),
(13, 100, 150.0, 'VIP'),
(14, 100, 40.0, 'STANDARD'),
(15, 100, 50.0, 'STANDARD');


CREATE TABLE pictures (
    id SERIAL PRIMARY KEY,
    id_event int,
    image_url TEXT NOT NULL,
    constraint fk_event foreign key (id_event) references event (id)
)
