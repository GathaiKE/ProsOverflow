use ProsOverflow
go
CREATE TABLE questions.answers(
	answer_id VARCHAR(100)PRIMARY KEY NOT NULL,
	answer TEXT NOT NULL,
	question_id VARCHAR(100) NOT NULL,
	user_id VARCHAR(100) NOT NULL,
	upvotes INT NOT NULL,
	downvotes INT NOT NULL,
	accepted int NOT NULL

FOREIGN KEY(question_id) REFERENCES questions.questions(question_id),
FOREIGN KEY(user_id) REFERENCES users.users(user_id)
);