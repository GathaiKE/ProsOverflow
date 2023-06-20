use ProsOverflow
go
CREATE OR ALTER PROCEDURE deactivatedUsers
AS
BEGIN
	SELECT * FROM users.users WHERE deactivated=1
END