use ProsOverflow
go

CREATE OR ALTER PROCEDURE getAnswer(@answer_id VARCHAR(100))
AS
BEGIN
	SELECT * FROM questions.answers WHERE questions.answers.answer_id=@answer_id
END