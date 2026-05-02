-- Create portfolio_views table
create table if not exists portfolio_views (
  id text primary key default 'stats',
  count integer default 0,
  updated_at timestamp with time zone default now()
);

-- Create function to increment portfolio views
create or replace function increment_portfolio_view()
returns integer
language plpgsql
as $$
begin
  -- Insert or update the stats row
  insert into portfolio_views (id, count, updated_at)
  values ('stats', 1, now())
  on conflict (id)
  do update set
    count = portfolio_views.count + 1,
    updated_at = now();

  -- Return the new count
  return (select count from portfolio_views where id = 'stats');
end;
$$;

-- Create Row Level Security policies for portfolio_views table
create policy "Allow read access for all users" on portfolio_views
for select using (true);

-- Create Row Level Security policies for public read access
alter table portfolio_views enable row level security;

-- Allow anyone to read the view count
create policy "Allow public read" on portfolio_views for select using (true);