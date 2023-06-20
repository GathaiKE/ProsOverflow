USE ProsOverflow
GO

CREATE OR ALTER PROCEDURE getUserByEmail(@email VARCHAR(100))
AS
BEGIN
	SELECT * FROM users.users AS u
	INNER JOIN users.userRoles AS user_role ON u.user_id=user_role.user_id
	INNER JOIN users.roles AS role ON user_role.role_id=role.role_id 
	WHERE u.email=@email AND u.deactivated=0
END
