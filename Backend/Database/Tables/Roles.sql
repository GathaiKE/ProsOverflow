use ProsOverflow
go

CREATE TABLE users.roles(
	role_id INT IDENTITY(1,1) PRIMARY KEY,
	role VARCHAR(100) NOT NULL
)