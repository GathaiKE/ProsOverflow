use ProsOverflow
go

CREATE or alter PROCEDURE downvoteQuestion(
	@question_id VARCHAR(100),
	@downvotes INT
)
AS
BEGIN
	UPDATE questions.questions SET downvotes=@downvotes
	WHERE question_id=@question_id
END