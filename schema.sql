-- Drops the tropical_inventory if it exists currently --
DROP DATABASE IF EXISTS tropical_inventory;
-- Creates the "tropical_inventory" database --
CREATE DATABASE tropical_inventory;

USE tropical_inventory;



-- -- connected to user login page --
-- CREATE TABLE IF NOT EXISTS `users` (
--   `id` int(5) NOT NULL AUTO_INCREMENT,
--   `first_name` text NOT NULL,
--   `last_name` text NOT NULL,
--   `mob_no` int(11) NOT NULL,
--   `user_name` varchar(20) NOT NULL,
--   `password` varchar(15) NOT NULL,
--   PRIMARY KEY (id)
-- ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;



-- -- Creates the "inventory" table and column names --
-- CREATE TABLE inventory(
-- 	id int NOT NULL AUTO_INCREMENT,
-- 	product_code VARCHAR(10),
-- 	description VARCHAR(500),
-- 	SF_Box VARCHAR(10),
-- 	dimension VARCHAR(500),
-- 	quantity INT(100),
-- 	total INT(100),
-- 	PRIMARY KEY (id)
-- );


-- -- Creates the "users" table and column names --
-- CREATE TABLE users(
-- 	id int NOT NULL AUTO_INCREMENT,
-- 	username VARCHAR(50),
-- 	email VARCHAR(100),
-- 	password BINARY(60),
-- 	PRIMARY KEY (id)
-- );
DROP DATABASE IF EXISTS test;
CREATE DATABASE test;
use test;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `mob_no` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;
