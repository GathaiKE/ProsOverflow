use ProsOverflow
go

CREATE TABLE users.userRoles(
	user_id VARCHAR(100),
	role_id INT,

	PRIMARY KEY(user_id,role_id),
	FOREIGN KEY(user_id) REFERENCES users.users(user_id),
	FOREIGN KEY(role_id) REFERENCES users.roles(role_id)
)