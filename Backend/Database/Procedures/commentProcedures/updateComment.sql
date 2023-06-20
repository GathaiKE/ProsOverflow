use ProsOverflow
go

CREATE OR ALTER PROCEDURE updateComment(@comment_id VARCHAR(100), @comment VARCHAR(2000))
AS
BEGIN
	UPDATE questions.comments SET comment=@comment
END