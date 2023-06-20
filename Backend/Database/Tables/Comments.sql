use ProsOverflow
go
CREATE TABLE questions.comments(
comment_id VARCHAR(100) PRIMARY KEY NOT NULL,
comment VARCHAR(1000) NOT NULL,
user_id VARCHAR(100) NOT NULL,
answer_id VARCHAR(100) NOT NULL,

FOREIGN KEY (user_id) REFERENCES users.users(user_id),
FOREIGN KEY (answer_id) REFERENCES questions.answers(answer_id)
)
