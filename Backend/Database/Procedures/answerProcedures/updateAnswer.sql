USE ProsOverflow
GO

CREATE OR ALTER PROCEDURE updateAnswer(
	@answer_id VARCHAR(100),
	@answer TEXT
)
AS
BEGIN
	UPDATE questions.answers SET answer=@answer
	WHERE answer_id=@answer_id
END