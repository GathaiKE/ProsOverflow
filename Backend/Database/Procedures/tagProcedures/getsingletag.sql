use ProsOverflow
go

create or alter procedure getSingleTag(
	@tag_id VARCHAR(100)
)
as
begin
	select * from questions.tags
	where tag_id=@tag_id
end