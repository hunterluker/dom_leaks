-- USERS

drop table if exists users;

create table users
(
    user_id serial primary key,
    user_name varchar(180), 
    email varchar(180),
    picture text,
    auth_id text
);


-- LEAKS

drop table if exists leaks;

create table leaks
(
    leak_id serial primary key,
    user_id integer references users(user_id),
    date text,
    image text,
    title varchar(180),
    description text
)

insert into leaks
(date, image, title, description)
values
('07/11/2017', 'https://wikileaks.org/IMG/rubon32.png?1467279700', 'Protego', 'Today, September 7th 2017, WikiLeaks publishes four secret documents from the Protego project of the CIA, along with 37 related documents (proprietary hardware/software manuals from Microchip Technology Inc.). The project was maintained between 2014 and 2015.
'\n'
Protego is not the usual malware development project like all previous publications by WikiLeaks in the Vault7 series. Indeed there is no explicit indication why it is part of the project repositories of the CIA/EDG at all.
'\n'
The Protego project is a PIC-based missile control system that was developed by Raytheon. The documents indicate that the system is installed on-board a Pratt & Whitney aircraft (PWA) equipped with missile launch systems (air-to-air and/or air-to-ground).
'\n'
Protego consists of separate micro-controller units that exchange data and signals over encrypted and authenticated channels On-board TWA are the Master Processor (MP) and the Deployment Box. Both systems are layed-out with master/slave redundancy.');

insert into leaks
(date, image, title, description)
values ('02/18/2018', 'https://wikileaks.org/IMG/arton700.png?1510228215', 'Vault 8: Hive', 'Hive solves a critical problem for the malware operators at the CIA. Even the most sophisticated malware implant on a target computer is useless if there is no way for it to communicate with its operators in a secure manner that does not draw attention. Using Hive even if an implant is discovered on a target computer, attributing it to the CIA is difficult by just looking at the communication of the malware with other servers on the internet. Hive provides a covert communications platform for a whole range of CIA malware to send exfiltrated information to CIA servers and to receive new instructions from operators at the CIA.
\r
Hive can serve multiple operations using multiple implants on target computers. Each operation anonymously registers at least one cover domain (e.g. "perfectly-boring-looking-domain.com") for its own use. The server running the domain website is rented from commercial hosting providers as a VPS (virtual private server) and its software is customized according to CIA specifications. These servers are the public-facing side of the CIA back-end infrastructure and act as a relay for HTTP(S) traffic over a VPN connection to a "hidden" CIA server called ''Blot''.' );


-- DOCUMENTS
drop table if exists documents;

create table documents
(
    docs_id serial primary key,
    leak_id integer,
    document text
)

select *
from documents d
join leaks l
on d.leak_id = l.leak_id;

