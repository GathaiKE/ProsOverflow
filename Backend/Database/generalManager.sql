use ProsOverflow
go

select * from users.roles
select * from users.users
select * from questions.answers
select * from questions.comments
select * from questions.questions
select * from questions.tags
select * from questions.questionTags
select * from users.userRoles

delete from questions.questions



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

exec addRole 'user'


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

delete from questions.questions where question_id='c7894baf-188d-4bc1-8c41-4ec8458cd612'