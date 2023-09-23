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