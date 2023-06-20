USE ProsOverflow
GO

CREATE OR ALTER PROCEDURE getAllAnswers
AS
BEGIN
	SELECT * FROM questions.answers
END