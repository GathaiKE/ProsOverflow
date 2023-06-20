USE ProsOverflow
GO

CREATE OR ALTER PROCEDURE deteleAnswer(@answer_id VARCHAR(100))
AS
BEGIN
	DELETE FROM questions.answers WHERE answer_id=@answer_id
END