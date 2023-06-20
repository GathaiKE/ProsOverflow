use ProsOverflow
go

CREATE OR ALTER PROCEDURE getSingleQuestion(@question_id VARCHAR(100))
AS
BEGIN
	SELECT q.question_id,q.title,q.body,q.user_id,q.upvotes,q.downvotes,t.tag_id,t.tag 
	FROM questions.questions AS q
	INNER JOIN users.users AS u
	ON q.user_id=u.user_id
	INNER JOIN questions.questionTags AS qt
	ON qt.question_id=q.question_id
	INNER JOIN questions.tags AS t ON t.tag_id=qt.tag_id
	wHERE q.question_id=@question_id
END