use ProsOverflow
go

CREATE OR ALTER PROCEDURE getQuestions
AS
BEGIN
	SELECT q.question_id,q.title, q.body,q.user_id, q.upvotes,q.downvotes,qt.tag_id,t.tag FROM questions.questions As q
	LEFT JOIN questions.questionTags AS qt ON q.question_id=qt.question_id
	LEFT JOIN questions.tags AS t ON qt.tag_id = t.tag_id
END

EXEC getQuestions