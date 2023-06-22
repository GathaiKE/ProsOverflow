use ProsOverflow
go

CREATE OR ALTER PROCEDURE reserPassword(@user_id VARCHAR(100))
AS 
BEGIN
	SELECT * FROM users.users WHERE user_id=@user_id
END