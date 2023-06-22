use ProsOverflow
go

CREATE PROCEDURE answerEmailSent(
	@user_id VARCHAR(100)
)
AS
BEGIN
	UPDATE users.users SET email_sent=2
END