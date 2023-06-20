use ProsOverflow
go

CREATE OR ALTER PROCEDURE deactivateUser(@user_id VARCHAR(100))
AS
BEGIN
	UPDATE users.users SET deactivated = 1
	WHERE user_id=@user_id AND deactivated=0
END