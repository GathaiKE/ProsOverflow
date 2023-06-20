use ProsOverflow
go

CREATE OR ALTER PROCEDURE getcomments(@answer_id VARCHAR(100))
AS
BEGIN
	SELECT u.user_id,u.first_name,u.second_name,u.profile_pic,c.comment_id,c.comment,c.answer_id
	FROM questions.comments AS c
	INNER JOIN users.users AS u ON u.user_id=c.user_id
	WHERE c.answer_id=@answer_id
end
