select *
from documents d
join leaks l
on d.leak_id = l.leak_id;