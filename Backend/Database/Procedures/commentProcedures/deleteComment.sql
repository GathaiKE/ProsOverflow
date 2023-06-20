use ProsOverflow
go

CREATE OR ALTER PROCEDURE deleteComment(
	@comment_id VARCHAR(100)
)
AS
BEGIN
	DELETE FROM questions.comments WHERE comment_id=@comment_id
END