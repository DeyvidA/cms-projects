-- create public technologies bucket
-- create public projects bucket

insert into storage.buckets (id, name, public)
values ('projects', 'projects', true);

insert into storage.buckets (id, name, public)
values ('technologies', 'technologies', true);


