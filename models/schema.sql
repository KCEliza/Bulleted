### Schema
DROP DATABASE IF EXISTS database_development;

CREATE DATABASE database_development;

USE database_development;



CREATE TABLE todays
(
	id int NOT NULL AUTO_INCREMENT,
	todo VARCHAR (255) NOT NULL,
	PRIMARY KEY (id)
);

SELECT * FROM todays; 

CREATE TABLE weeks
(
	id int NOT NULL AUTO_INCREMENT,
	todo VARCHAR (255) NOT NULL,
	PRIMARY KEY (id)
);

SELECT * FROM weeks; 

CREATE TABLE months
(
	id int NOT NULL AUTO_INCREMENT,
	todo VARCHAR (255) NOT NULL,
	PRIMARY KEY (id)
);

SELECT * FROM months;

CREATE TABLE journals
(
	id int NOT NULL AUTO_INCREMENT,
	title VARCHAR (255) NOT NULL,
	body text,
	PRIMARY KEY (id)
);

SELECT * FROM journals;

CREATE TABLE trackers
(
	id int NOT NULL AUTO_INCREMENT,
	habit VARCHAR (255) NOT NULL,
	sunday BOOLEAN,
	monday BOOLEAN,
	tuesday BOOLEAN,
	wednesday BOOLEAN,
	thursday BOOLEAN,
	friday BOOLEAN,
	saturday BOOLEAN,
	PRIMARY KEY (id)
);

SELECT * FROM trackers;
