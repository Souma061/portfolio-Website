# Supabase Setup for Portfolio View Tracker

## Setup Instructions

1. **Create a Supabase project:**
   - Go to [supabase.io](https://supabase.io) and create a new project
   - Note your Project URL and Anon Key from the project settings

2. **Update your environment variables:**
   - Replace `your_supabase_url` with your actual Supabase Project URL
   - Replace `your_supabase_anon_key` with your actual Supabase Anon Key in `.env`

3. **Run the database migration:**
   - Execute the SQL in `supabase/migrations/0001_create_portfolio_views.sql` in your Supabase SQL editor

4. **Set up Row Level Security (RLS):**
   - The migration enables RLS on `portfolio_views` and `portfolio_view_visitors`
   - Public visitors get read access through the `Allow public read` policy
   - View increments happen through the `increment_portfolio_view(visitor_key)` RPC function, which runs with owner privileges
   - The app calls `/api/visitor-count`, which hashes the request IP and sends only that hash to Supabase for 30-day deduping

5. **Test the implementation:**
   - Restart your development server
   - Visit your portfolio to trigger the view counter
   - Opening the site in another browser on the same public IP should show the same count without incrementing again
