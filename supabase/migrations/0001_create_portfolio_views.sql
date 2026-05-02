-- Create portfolio_views table
create table if not exists portfolio_views (
  id text primary key default 'stats',
  count integer default 0,
  updated_at timestamp with time zone default now()
);

-- Create function to increment portfolio views.
-- Runs with owner privileges so anonymous visitors can increment the counter
-- without needing direct insert/update policies on the table.
create or replace function public.increment_portfolio_view()
returns integer
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Insert or update the stats row
  insert into public.portfolio_views (id, count, updated_at)
  values ('stats', 1, now())
  on conflict (id)
  do update set
    count = public.portfolio_views.count + 1,
    updated_at = now();

  -- Return the new count
  return (select count from public.portfolio_views where id = 'stats');
end;
$$;

-- Create Row Level Security policies for public read access
alter table portfolio_views enable row level security;

-- Allow anyone to read the view count
drop policy if exists "Allow public read" on portfolio_views;
create policy "Allow public read" on portfolio_views for select using (true);

grant execute on function public.increment_portfolio_view() to anon, authenticated;
