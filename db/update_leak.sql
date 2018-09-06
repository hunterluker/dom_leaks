update leaks
set date = $2,
    image = $3,
    title = $4,
    description = $5
where leak_id = $1;

select *
from leaks;