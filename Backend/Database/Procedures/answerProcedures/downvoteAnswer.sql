use ProsOverflow
go

CREATE OR ALTER PROCEDURE downvoteAnswer(
	@answer_id VARCHAR(100),
	@downvotes INT
)
AS
BEGIN
	UPDATE questions.answers SET downvotes=@downvotes
	WHERE answer_id=@answer_id
END