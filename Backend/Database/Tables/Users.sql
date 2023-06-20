CREATE DATABASE ProsOverflow

create schema users
go

use prosoverflow
go
CREATE TABLE users.users(
	user_id VARCHAR (100) NOT NULL PRIMARY KEY,
	profile_pic VARCHAR(200),
	first_name VARCHAR(200) not null,
	second_name VARCHAR(200) not null,
	email VARCHAR(50) UNIQUE not null,
	email_sent int not null,
	deactivated int not null,
	password VARCHAR(200) not null,
)