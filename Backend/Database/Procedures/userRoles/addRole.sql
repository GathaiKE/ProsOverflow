USE ProsOverflow
GO

CREATE or alter PROCEDURE addUserRole(
	@user_id VARCHAR(100),
	@role_id INT
)
AS
BEGIN
	INSERT INTO users.userRoles (user_id,role_id)
	VALUES (@user_id,@role_id)
END