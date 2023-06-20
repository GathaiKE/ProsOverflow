use ProsOverflow
go

CREATE or ALTER PROCEDURE acceptAnswer(@answer_id VARCHAR(100))
AS
BEGIN 
	UPDATE questions.answers SET accepted=1
	WHERE answer_id=@answer_id
END