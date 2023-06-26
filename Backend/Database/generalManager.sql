use ProsOverflow
go

exec getNewUsers
select * from users.roles
select * from users.users
select * from questions.answers d4e809c6-cb96-46b6-9fb6-78bb99670183
select * from questions.comments
select * from questions.questions
select * from questions.tags
select * from questions.questionTags
select * from users.userRoles

delete from users.users
update users.users set email_sent=0


drop table users.roles
drop table users.users
drop table users.userRoles
drop table questions.questions
drop table questions.answers
drop table questions.comments
drop table questions.tags
drop table questions.questionTags


create procedure addRole(
	@role varchar(50)
)
as
begin
	insert into users.roles (role)
	values (@role)
end

exec postQuestion '1','No','Yes yes','1','0','0'


CREATE PROCEDURE GetUserWithRole
    @user_id UNIQUEIDENTIFIER
AS
BEGIN
    SELECT u.username, u.email, r.role
    FROM users u
    INNER JOIN user_roles ur ON u.user_id = ur.user_id
    INNER JOIN roles r ON ur.role_id = r.role_id
    WHERE u.user_id = @user_id;
END

delete from questions.questions where user_id='f40db967-104f-48f1-817f-f445fdd977ea'