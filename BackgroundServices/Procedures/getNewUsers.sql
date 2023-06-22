use ProsOverflow
go

CREATE PROCEDURE getNewUsers
AS
BEGIN
	SELECT * FROM users.users WHERE email_sent=0 AND deactivated=0
END