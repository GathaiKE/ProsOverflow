USE ProsOverflow
GO

CREATE PROCEDURE deleteUser(
	@user_id VARCHAR(100)
)
AS
BEGIN
	DELETE FROM users.userRoles WHERE user_id=@user_id
END