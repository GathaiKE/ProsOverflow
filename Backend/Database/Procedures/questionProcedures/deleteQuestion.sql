USE ProsOverflow
GO

CREATE OR ALTER PROCEDURE deleteQuestion(@question_id VARCHAR(100))
AS
BEGIN
	DELETE FROM questions.questions 
	WHERE question_id=@question_id
END
