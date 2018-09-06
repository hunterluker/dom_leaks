delete from leaks
where leak_id = $1;

select *
from leaks;