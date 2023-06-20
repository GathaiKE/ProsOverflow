USE ProsOverflow
GO

CREATE OR ALTER PROCEDURE deleteQuestionTags(@question_id VARCHAR(100))
AS
BEGIN
	DELETE FROM questions.questionTags 
	WHERE question_id=@question_id
END
