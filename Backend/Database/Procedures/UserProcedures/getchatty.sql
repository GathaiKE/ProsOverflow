use ProsOverflow
go

CREATE OR ALTER PROCEDURE gechattyQuestions
    @PageSize INT,
    @PageNumber INT
AS
BEGIN
    SELECT q.question_id, q.title, q.body, q.user_id, q.upvotes, q.downvotes, qt.tag_id, t.tag
    FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY q.question_id) AS RowNumber, q.*
        FROM questions.questions AS q
    ) AS q
    LEFT JOIN questions.questionTags AS qt ON q.question_id = qt.question_id
    LEFT JOIN questions.tags AS t ON qt.tag_id = t.tag_id
    WHERE q.RowNumber BETWEEN (@PageSize * (@PageNumber - 1) + 1) AND (@PageSize * @PageNumber)
END

