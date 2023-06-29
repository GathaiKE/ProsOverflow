USE ProsOverflow
GO
CREATE OR ALTER PROCEDURE getUserById(@user_id VARCHAR(100))
AS
BEGIN
	SELECT u.user_id,u.profile_pic,u.email,u.first_name,u.second_name,u.deactivated,u.email_sent,role.role FROM users.users AS u
	INNER JOIN users.userRoles AS user_role ON u.user_id=user_role.user_id
	INNER JOIN users.roles AS role ON user_role.role_id=role.role_id 
	WHERE u.user_id=@user_id AND deactivated=0
END


