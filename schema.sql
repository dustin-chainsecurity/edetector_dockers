CREATE DATABASE IF NOT EXISTS edetector;
USE edetector;

CREATE TABLE IF NOT EXISTS user (
	id         INT          AUTO_INCREMENT PRIMARY KEY,
	username   VARCHAR(45)  NOT NULL UNIQUE,
	password   VARCHAR(45)  NOT NULL
);

CREATE TABLE IF NOT EXISTS user_info (
	id           INT          PRIMARY KEY,
	department   VARCHAR(45)  NOT NULL,
	email        VARCHAR(45)  NOT NULL,
	permission   VARCHAR(255),
	status       TINYINT      NOT NULL,
	token        VARCHAR(45),
	token_time   TIMESTAMP,
	FOREIGN KEY (id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS client (
  client_id   VARCHAR(45)   PRIMARY KEY,
  ip          VARCHAR(45)   NOT NULL,
  mac         VARCHAR(45)   NOT NULL
);

CREATE TABLE IF NOT EXISTS client_setting (
  client_id      VARCHAR(45)  PRIMARY KEY,
  networkreport  TINYINT(1)   NOT NULL DEFAULT 0,
  processreport  TINYINT(1)   NOT NULL DEFAULT 0,
  FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS client_info (
  client_id     VARCHAR(45)   PRIMARY KEY,
  sysinfo       VARCHAR(100)  NOT NULL,
  osinfo        VARCHAR(100)  NOT NULL,
  computername  VARCHAR(100)  NOT NULL,
  username      VARCHAR(100)  NOT NULL,
  fileversion   VARCHAR(100)  NOT NULL,
  boottime      VARCHAR(45)   NOT NULL,
  FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS group_info (
	group_id     INT           AUTO_INCREMENT PRIMARY KEY,
	group_name   VARCHAR(45)   NOT NULL UNIQUE,
	description  VARCHAR(1000) NOT NULL,
	range_begin  VARCHAR(45)   NOT NULL,
	range_end    VARCHAR(45)   NOT NULL
);

CREATE TABLE IF NOT EXISTS client_group (
	client_id   VARCHAR(45) NOT NULL,
	group_id    INT         NOT NULL,
	PRIMARY KEY (client_id, group_id),
	FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE,
	FOREIGN KEY (group_id) REFERENCES group_info(group_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS task (
	task_id    VARCHAR(45) PRIMARY KEY,
	client_id  VARCHAR(45) NOT NULL,
	type       VARCHAR(45) NOT NULL,
	status     INT         NOT NULL,
	progress   INT         NOT NULL,
	timestamp  TIMESTAMP   NOT NULL,
	FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS client_task_status (
	client_id            VARCHAR(45) PRIMARY KEY,
	scan_schedule        VARCHAR(45),
	scan_finish_time     TIMESTAMP,
	collect_schedule     VARCHAR(45),
	collect_finish_time  TIMESTAMP,
	file_schedule        VARCHAR(45),
	file_finish_time     TIMESTAMP,
	image_finish_time    TIMESTAMP,
	FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS analysis_template (
	template_id           VARCHAR(45)  PRIMARY KEY,
	template_name         VARCHAR(45)  NOT NULL UNIQUE,
	work                  VARCHAR(45)  NOT NULL,
	keyword_type          VARCHAR(45),
	keyword               VARCHAR(255),
	history_and_bookmark  VARCHAR(45)  NOT NULL,
	cookie_and_cache      VARCHAR(45)  NOT NULL,
	connection_history    VARCHAR(45)  NOT NULL,
	process_history       VARCHAR(45)  NOT NULL,
	vanishing_history     VARCHAR(45)  NOT NULL,
	recent_opening        VARCHAR(45)  NOT NULL,
	usb_history           VARCHAR(45)  NOT NULL,
	email_history         VARCHAR(45)  NOT NULL
);

CREATE TABLE IF NOT EXISTS white_list (
	id         INT          AUTO_INCREMENT PRIMARY KEY,
	setup_user VARCHAR(45),
	filename   VARCHAR(255),
	md5        VARCHAR(255),
	signature  VARCHAR(10),
	path       VARCHAR(255),
	reason     VARCHAR(255),
	UNIQUE (filename, md5, signature, path)
);

CREATE TABLE IF NOT EXISTS black_list (
	id         INT           AUTO_INCREMENT PRIMARY KEY,
	setup_user VARCHAR(45) ,
	filename   VARCHAR(255),
	md5        VARCHAR(255),
	signature  VARCHAR(10),
	path       VARCHAR(255),
	reason     VARCHAR(255),
	UNIQUE (filename, md5, signature, path)
);

CREATE TABLE IF NOT EXISTS hack_list (
	id            INT           AUTO_INCREMENT PRIMARY KEY,
	process_name  VARCHAR(255),
	cmd           VARCHAR(255),
	path          VARCHAR(255),
	adding_point  INT
);

CREATE TABLE IF NOT EXISTS log (
	id         INT          AUTO_INCREMENT PRIMARY KEY,
	timestamp  TIMESTAMP    NOT NULL,
	level      VARCHAR(20)  NOT NULL,
	service    VARCHAR(20)  NOT NULL,
	content    VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS key_image (
	id       INT          AUTO_INCREMENT PRIMARY KEY,
	type     VARCHAR(20)  NOT NULL,
	apptype  VARCHAR(45),
	path     VARCHAR(255),
	keyword  VARCHAR(255)
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

INSERT IGNORE INTO user (username, password)
VALUES
	('test', MD5('123')),
	('chiehyu', MD5('123')),
	('tyson', MD5('123')),
	('webber', MD5('123')),
	('peggy', MD5('123')),
	('james', MD5('123')),
	('mars', MD5('123')),
	('beta', MD5('123')),
	('bob', MD5('456')),
	('QA', MD5('123'));

INSERT IGNORE INTO user_info (id, department, email, permission, status, token)
VALUES (1, 'test', 'test@example.com', 'all', 1, '123');

INSERT IGNORE INTO user_info (id, department, email, permission, status)
VALUES 
	(2, 'chiehyu', 'chiehyu@example.com', 'all', 1),
	(3, 'tyson', 'tyson@example.com', 'all', 1),
	(4, 'webber', 'webber@example.com', 'all', 1),
	(5, 'peggy', 'peggy@example.com', 'all', 1),
	(6, 'james', 'james@example.com', 'all', 1),
	(7, 'mars', 'mars@example.com', 'all', 1),
	(8, 'beta', 'beta@example.com', 'all', 1),
	(9, 'bob', 'bob@example.com', 'all', 1),
	(10, 'QA', 'qa@example.com', 'all', 1);