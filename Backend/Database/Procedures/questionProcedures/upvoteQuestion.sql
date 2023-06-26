use ProsOverflow
go

CREATE or alter PROCEDURE upvoteQuestion(
	@question_id VARCHAR(100),
	@upvotes INT
)
AS
BEGIN
	UPDATE questions.questions SET upvotes=@upvotes
	WHERE question_id=@question_id
END