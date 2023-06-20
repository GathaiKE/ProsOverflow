use ProsOverflow
go

CREATE OR ALTER PROCEDURE upvote(
	@answer_id VARCHAR(100),
	@upvotes INT
)
AS
BEGIN
	UPDATE questions.answers SET upvotes=@upvotes
	WHERE answer_id=@answer_id
END