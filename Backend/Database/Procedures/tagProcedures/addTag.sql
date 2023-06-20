use ProsOverflow
go

CREATE OR ALTER PROCEDURE addTag(
	@tag_id VARCHAR(100),
	@tag VARCHAR(100)
)
AS
BEGIN
	INSERT INTO questions.tags (tag_id,tag)
	VALUES (@tag_id,@tag)
END