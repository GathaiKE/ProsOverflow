USE ProsOverflow
GO

CREATE PROCEDURE getUserRole(
	@user_id VARCHAR(100)
)
AS
BEGIN
	SELECT * FROM users.userRoles WHERE user_id=@user_id
END