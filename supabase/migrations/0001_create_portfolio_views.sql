-- Create portfolio_views table
create table if not exists portfolio_views (
  id text primary key default 'stats',
  count integer default 0,
  updated_at timestamp with time zone default now()
);

-- Stores anonymized visitor identifiers for IP-based deduping.
create table if not exists public.portfolio_view_visitors (
  visitor_key text primary key,
  last_seen timestamp with time zone default now()
);

-- Create function to increment portfolio views.
-- Runs with owner privileges so anonymous visitors can increment the counter
-- without needing direct insert/update policies on the table.
drop function if exists public.increment_portfolio_view();
create or replace function public.increment_portfolio_view(visitor_key text default null)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  did_count boolean;
begin
  if visitor_key is not null and btrim(visitor_key) <> '' then
    insert into public.portfolio_view_visitors (visitor_key, last_seen)
    values (visitor_key, now())
    on conflict (visitor_key)
    do update set last_seen = excluded.last_seen
    where public.portfolio_view_visitors.last_seen < now() - interval '30 days'
    returning true into did_count;

    if did_count is not true then
      return coalesce((select count from public.portfolio_views where id = 'stats'), 0);
    end if;
  end if;

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
alter table public.portfolio_view_visitors enable row level security;

-- Allow anyone to read the view count
drop policy if exists "Allow public read" on portfolio_views;
create policy "Allow public read" on portfolio_views for select using (true);

grant execute on function public.increment_portfolio_view(text) to anon, authenticated;
