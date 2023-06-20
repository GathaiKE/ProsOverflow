use ProsOverflow
go

CREATE OR ALTER PROCEDURE getTags
AS
BEGIN
	SELECT * FROM questions.tags
END