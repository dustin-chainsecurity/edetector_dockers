CREATE DATABASE IF NOT EXISTS edetector;
USE edetector;

CREATE TABLE IF NOT EXISTS user (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(45) NOT NULL,
	password VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_info (
	id INT NOT NULL,
	token VARCHAR(200),
	token_time TIMESTAMP,
	email VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS client(
  client_id varchar(45) NOT NULL,
  ip varchar(45),
  mac varchar(45),
  PRIMARY KEY (client_id)
);

CREATE TABLE IF NOT EXISTS client_setting(
  client_id varchar(45),
  networkreport boolean,
  processreport boolean,
  PRIMARY KEY (client_id),
  FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS client_info(
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

CREATE TABLE IF NOT EXISTS group_info (
	group_id INT AUTO_INCREMENT PRIMARY KEY,
	group_name VARCHAR(45) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	range_begin VARCHAR(45) NOT NULL,
	range_end VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS client_group (
	client_id varchar(45) NOT NULL,
	group_id INT NOT NULL,
	PRIMARY KEY (client_id, group_id),
	FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE,
	FOREIGN KEY (group_id) REFERENCES group_info(group_id)
);

CREATE TABLE IF NOT EXISTS task (
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

CREATE TABLE IF NOT EXISTS client_task_status (
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

CREATE TABLE IF NOT EXISTS analysis_template (
	template_id varchar(45) NOT NULL,
	template_name varchar(45) NOT NULL,
	work varchar(45) NOT NULL,
	keyword_type varchar(45),
	keyword varchar(255),
	history_and_bookmark varchar(45) NOT NULL,
	cookie_and_cache varchar(45) NOT NULL,
	connection_history varchar(45) NOT NULL,
	process_history varchar(45) NOT NULL,
	vanishing_history varchar(45) NOT NULL,
	recent_opening varchar(45) NOT NULL,
	usb_history varchar(45) NOT NULL,
	email_history varchar(45) NOT NULL,
	PRIMARY KEY (template_id)
);

INSERT INTO user (username, password)
SELECT 'test', MD5('123')
WHERE NOT EXISTS (
    SELECT 1 FROM user WHERE username = 'test'
);

INSERT INTO user_info (id, token, email)
SELECT '1', '123', 'test@example.com'
WHERE NOT EXISTS (
    SELECT 1 FROM user_info WHERE id = '1'
);

INSERT INTO user (username, password)
SELECT 'chiehyu', MD5('123')
WHERE NOT EXISTS (SELECT 1 FROM user WHERE username = 'chiehyu')
UNION
SELECT 'beta', MD5('123')
WHERE NOT EXISTS (SELECT 1 FROM user WHERE username = 'beta')
UNION
SELECT 'bob', MD5('456')
WHERE NOT EXISTS (SELECT 1 FROM user WHERE username = 'bob')
UNION
SELECT 'QA', MD5('123')
WHERE NOT EXISTS (SELECT 1 FROM user WHERE username = 'QA');

INSERT INTO user_info (id, email)
SELECT '2', 'chiehyu@example.com'
WHERE NOT EXISTS (SELECT 1 FROM user_info WHERE id = '2')
UNION
SELECT '3', 'beta@example.com'
WHERE NOT EXISTS (SELECT 1 FROM user_info WHERE id = '3')
UNION
SELECT '4', 'bob@example.com'
WHERE NOT EXISTS (SELECT 1 FROM user_info WHERE id = '4')
UNION
SELECT '5', 'qa@example.com'
WHERE NOT EXISTS (SELECT 1 FROM user_info WHERE id = '5');