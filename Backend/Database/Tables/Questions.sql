create schema questions
go

use ProsOverflow
go 

CREATE TABLE questions.questions (
    question_id VARCHAR(100) PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    user_id VARCHAR(100) NOT NULL,
	upvotes INT NOT NULL,
	downvotes INT NOT NULL


    FOREIGN KEY (user_id) REFERENCES users.users(user_id)
);
