use ProsOverflow
go

CREATE OR ALTER PROCEDURE getQuestionAnswers(@question_id VARCHAR(100))
AS
BEGIN
	SELECT * FROM questions.answers WHERE questions.answers.question_id=@question_id
END