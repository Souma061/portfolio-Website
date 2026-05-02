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
   - In your Supabase project, go to the Authentication settings
   - Enable RLS on the `portfolio_views` table to allow public read access

5. **Test the implementation:**
   - Restart your development server
   - Visit your portfolio to trigger the view counter