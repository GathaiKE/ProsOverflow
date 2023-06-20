use ProsOverflow
go

CREATE OR ALTER PROCEDURE register(
	@user_id VARCHAR(100),
	@profile_pic VARCHAR(100),
	@first_name VARCHAR(100),
	@second_name VARCHAR(100),
	@email VARCHAR(100),
	@email_sent INT,
	@deactivated INT,
	@password VARCHAR(100)
)
AS
BEGIN
	INSERT INTO users.users (user_id,profile_pic,first_name,second_name,email,email_sent,deactivated,password)
	VALUES (@user_id,@profile_pic,@first_name,@second_name,@email,@email_sent,@deactivated,@password)
END