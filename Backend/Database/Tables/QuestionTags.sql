USE ProsOverflow
GO

CREATE TABLE questions.questionTags(
	question_id VARCHAR(100) NOT NULL,
	tag_id VARCHAR(100) NOT NULL

	PRIMARY KEY(question_id,tag_id),
	FOREIGN KEY(question_id) REFERENCES questions.questions(question_id) ON DELETE CASCADE,
	FOREIGN KEY(tag_id) REFERENCES questions.tags(tag_id)
)