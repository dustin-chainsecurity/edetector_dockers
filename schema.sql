DROP DATABASE IF EXISTS edetector;
CREATE DATABASE edetector;
USE edetector;

CREATE TABLE user (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(45) NOT NULL,
	password VARCHAR(45) NOT NULL
);

CREATE TABLE user_info (
	id INT NOT NULL,
	token VARCHAR(200),
	token_time TIMESTAMP,
	email VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE client(
  client_id varchar(45) NOT NULL,
  ip varchar(45),
  mac varchar(45),
  PRIMARY KEY (client_id)
);

CREATE TABLE client_setting(
  client_id varchar(45),
  networkreport boolean,
  processreport boolean,
  PRIMARY KEY (client_id),
  FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

CREATE TABLE client_info(
  client_id varchar(45) NOT NULL,
  sysinfo varchar(100) NOT NULL,
  osinfo varchar(100) NOT NULL,
  computername varchar(100) NOT NULL,
  username varchar(100) NOT NULL,
  fileversion varchar(100) NOT NULL,
  boottime varchar(45) NOT NULL,
  PRIMARY KEY (client_id),
  FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

CREATE TABLE group_info (
	group_id INT AUTO_INCREMENT PRIMARY KEY,
	group_name VARCHAR(45) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	range_begin VARCHAR(45) NOT NULL,
	range_end VARCHAR(45) NOT NULL
);

CREATE TABLE client_group (
	client_id varchar(45) NOT NULL,
	group_id INT NOT NULL,
	PRIMARY KEY (client_id, group_id),
	FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE,
	FOREIGN KEY (group_id) REFERENCES group_info(group_id)
);

CREATE TABLE task (
	task_id varchar(45) NOT NULL,
	client_id varchar(45) NOT NULL,
  server_id varchar(45),
	type varchar(45) NOT NULL,
	status INT NOT NULL,
	progress INT NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	PRIMARY KEY (task_id),
	FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

CREATE TABLE client_task_status (
	client_id varchar(45) NOT NULL,
	scan_schedule varchar(45),
	scan_finish_time TIMESTAMP,
	collect_schedule varchar(45),
	collect_finish_time TIMESTAMP,
	file_schedule varchar(45),
	file_finish_time TIMESTAMP,
	image_finish_time TIMESTAMP,
	FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

INSERT INTO user (username, password) VALUES ('test', MD5('123'));
INSERT INTO user_info (id, token, email) VALUES ('1', '123', 'test@example.com');

INSERT INTO user (username, password) VALUES ('chiehyu', MD5('123'));
INSERT INTO user_info (id, email) VALUES ('2', 'chiehyu@example.com');

INSERT INTO user (username, password) VALUES ('beta', MD5('123'));
INSERT INTO user_info (id, email) VALUES ('3', 'beta@example.com');

INSERT INTO user (username, password) VALUES ('bob', MD5('456'));
INSERT INTO user_info (id, email) VALUES ('4', 'bob@example.com');

INSERT INTO user (username, password) VALUES ('QA', MD5('123'));
INSERT INTO user_info (id, email) VALUES ('5', 'qa@example.com');