create table if not exists payments (
  id bigserial primary key,
  method text not null,
  amount numeric not null default 0,
  reference text,
  note text,
  ts bigint not null
);

alter table payments enable row level security;
create policy "allow read" on payments for select using (true);
create policy "allow insert" on payments for insert with check (true);
