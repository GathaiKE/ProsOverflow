use ProsOverflow
go

CREATE OR ALTER PROCEDURE updateTag(@tag_id VARCHAR(100),@tag VARCHAR(100))
AS
BEGIN
	UPDATE questions.tags SET tag=@tag
END