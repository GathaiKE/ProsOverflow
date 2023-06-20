use ProsOverflow
go

CREATE OR ALTER PROCEDURE postQuestion(
	@question_id VARCHAR(100),
	@title VARCHAR(100),
	@body TEXT,
	@user_id VARCHAR(100),
	@upvotes INT,
	@downvotes INT
)
AS
BEGIN 
	INSERT INTO questions.questions (question_id,title,body,user_id,upvotes,downvotes)
	VALUES (@question_id,@title, @body,@user_id,@upvotes,@downvotes)
END
