use ProsOverflow
go

CREATE PROCEDURE getAcceptedAnswerUsers(
	@user_id VARCHAR(100)
)
AS
BEGIN
	SELECT * FROM questions.answers AS a
	LEFT JOIN users.users AS u ON a.user_id=u.user_id
	WHERE a.accepted=1 AND u.deactivated=0
END