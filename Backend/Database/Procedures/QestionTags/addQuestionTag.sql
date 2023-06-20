use ProsOverflow
go

CREATE PROCEDURE addQuestionTag(
	@question_id VARCHAR(100),
	@tag_id VARCHAR(100)
)
AS
BEGIN
	INSERT INTO questions.questionTags (question_id,tag_id)
	VALUES (@question_id,@tag_id)
END