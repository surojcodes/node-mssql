use Stuff
go
--create table todos 
--(
--    id int identity(1,1) primary key,
--    title varchar(50) not null,
--    description varchar (max) not null,
--    createdAt datetime,
--    updatedAt datetime
--)

--INSERT into todos (title,description,createdAt,updatedAt)
--values 
--('Clean Room','Clean Room before 7pm.','11/28/2023','11/28/2023'),
--('Pickup Jim','School ends at 4. Pick up Jim from school.','11/29/2023','11/29/2023')


--select * from todos

CREATE PROCEDURE usp_insertTodo
(
    @title varchar(50),
    @description varchar(max)
)
as
begin
    INSERT INTO todos (title,description,createdAt,updatedAt)
    values (@title,@description,GETDATE(),GETDATE())
end


