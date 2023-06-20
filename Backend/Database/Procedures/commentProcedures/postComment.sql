use ProsOverflow
go

CREATE OR ALTER PROCEDURE postComment(
	@comment_id VARCHAR(100),
	@comment VARCHAR(100),
	@answer_id VARCHAR(100),
	@user_id VARCHAR(100)
)
AS
BEGIN
	INSERT INTO questions.comments (comment_id,comment,answer_id,user_id)
	VALUES (@comment_id,@comment,@answer_id,@user_id)
END