use ProsOverflow
go

CREATE OR ALTER PROCEDURE postAnswer(
	@answer_id VARCHAR(100),
	@answer TEXT,
	@question_id VARCHAR(100),
	@user_id VARCHAR(100),
	@upvotes INT,
	@downvotes INT,
	@accepted INT
)
AS
BEGIN
	INSERT INTO questions.answers (answer_id, answer,question_id,user_id,upvotes,downvotes,accepted)
	VALUES (@answer_id,@answer,@question_id,@user_id,@upvotes,@downvotes,@accepted)
END