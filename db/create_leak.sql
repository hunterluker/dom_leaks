insert into leaks
(date, image, title, description)
values($1, $2, $3, $4);

select *
from leaks;