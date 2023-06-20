use ProsOverflow
go

CREATE TABLE questions.tags(
tag_id VARCHAR(100) PRIMARY KEY NOT NULL,
tag VARCHAR(100) NOT NULL UNIQUE
)