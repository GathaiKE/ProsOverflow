use ProsOverflow
go

CREATE PROCEDURE emailSent(
	@user_id VARCHAR(100)
)
AS
BEGIN
	UPDATE users.users SET email_sent=1
END