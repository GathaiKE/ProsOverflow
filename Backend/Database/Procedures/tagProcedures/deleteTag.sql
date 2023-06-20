use ProsOverflow
go

CREATE OR ALTER PROCEDURE deleteTag(@tag_id VARCHAR(100))
AS
BEGIN
	DELETE FROM questions.tags WHERE tag_id=@tag_id
END