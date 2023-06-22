use ProsOverflow
go

create procedure getAccepted
as
begin
	select * from questions.answers as a
	left join users.users as u on a.user_id=u.user_id
	where a.accepted=1
end