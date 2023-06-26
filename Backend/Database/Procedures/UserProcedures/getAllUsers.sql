use ProsOverflow
go 

CREATE OR ALTER PROCEDURE getPagUser
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SELECT *
    FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY u.user_id) AS RowNum, u.*, role.*
        FROM users.users AS u
        INNER JOIN users.userRoles AS user_role ON u.user_id = user_role.user_id
        INNER JOIN users.roles AS role ON user_role.role_id = role.role_id
        WHERE u.deactivated = 0
    ) AS PaginatedUsers
    WHERE RowNum BETWEEN ((@PageNumber - 1) * @PageSize + 1) AND (@PageNumber * @PageSize)
    ORDER BY RowNum
END