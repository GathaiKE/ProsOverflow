use ProsOverflow
go

CREATE OR ALTER PROCEDURE updateUser(
	@profile_pic VARCHAR(100),
	@user_id VARCHAR(100),
	@first_name VARCHAR(100),
	@second_name VARCHAR(100),
	@email VARCHAR(100)
)
AS
BEGIN 
	UPDATE users.users SET profile_pic=@profile_pic, first_name=@first_name, second_name=@second_name, email=@email
	WHERE user_id=@user_id
END