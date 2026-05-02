import { useEffect, useRef, useState } from 'react';
import supabase from '../supabase.js';

export default function useVisitorCount() {
  const [visits, setVisits] = useState(0);
  const [loading, setLoading] = useState(true);
  const hasIncremented = useRef(false);

  useEffect(() => {
    const VISITOR_KEY = 'visitor_timestamp';
    const EXPIRY_TIME = 30 * 24 * 60 * 60 * 1000; // ~30 days

    // Set up real-time listener for view count
    const fetchViewCount = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_views')
          .select('count')
          .eq('id', 'stats')
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          console.error('Error fetching view count:', error);
          return;
        }

        if (data) {
          setVisits(data.count || 0);
        } else {
          setVisits(0);
        }
      } catch (error) {
        console.error('Error fetching view count:', error);
        setVisits(0); // Fallback to 0 if there's an error
      } finally {
        setLoading(false);
      }
    };

    // Handle increment logic
    const handleIncrement = async () => {
      // Prevent running twice in development
      if (hasIncremented.current) return;

      const storedData = localStorage.getItem(VISITOR_KEY);
      const currentTime = new Date().getTime();
      let shouldIncrement = false;

      try {
        if (!storedData) {
          shouldIncrement = true;
        } else {
          const { timestamp } = JSON.parse(storedData);
          if (currentTime - timestamp > EXPIRY_TIME) {
            shouldIncrement = true;
          }
        }
      } catch {
        shouldIncrement = true;
      }

      if (shouldIncrement) {
        hasIncremented.current = true;

        try {
          // Increment view count in Supabase
          const { data, error } = await supabase.rpc('increment_portfolio_view');

          if (error) {
            console.error('Error incrementing view count:', error);
            await fetchViewCount();
          } else {
            // Update Local Storage after the write succeeds.
            localStorage.setItem(VISITOR_KEY, JSON.stringify({
              visited: true,
              timestamp: currentTime
            }));
            setVisits(data);
            setLoading(false);
          }
        } catch (error) {
          console.error('Error updating visitor count:', error);
          await fetchViewCount();
        }
      } else {
        // Just fetch the current count if we're not incrementing
        fetchViewCount();
      }
    };

    handleIncrement();
  }, []);

  return { visits, loading };
}
