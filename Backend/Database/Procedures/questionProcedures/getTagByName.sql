use ProsOverflow
go

create procedure getTagByName(@tag VARCHAR(100))
as
begin
	select * from questions.tags where tag=@tag
end