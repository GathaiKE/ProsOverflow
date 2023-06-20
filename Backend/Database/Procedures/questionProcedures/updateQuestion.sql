USE ProsOverflow
GO

CREATE OR ALTER PROCEDURE updateQuestion(
@question_id VARCHAR(100),
@title VARCHAR(100),
@body TEXT
)
AS
BEGIN
	UPDATE questions.questions SET title=@title, body=@body
	WHERE question_id=@question_id
END