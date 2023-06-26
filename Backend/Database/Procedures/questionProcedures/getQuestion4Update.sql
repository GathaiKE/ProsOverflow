use ProsOverflow
go

creATE or alter PROCEDURE getQ4Update(@question_id varchar(100))
as
begin
	select * from questions.questions where question_id=@question_id
end