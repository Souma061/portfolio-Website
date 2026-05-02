import { useEffect, useRef, useState } from 'react';
import supabase from '../supabase.js';

export default function useVisitorCount() {
  const [visits, setVisits] = useState(0);
  const [loading, setLoading] = useState(true);
  const hasIncremented = useRef(false);

  useEffect(() => {
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

    const handleIncrement = async () => {
      if (hasIncremented.current) return;
      hasIncremented.current = true;

      try {
        const response = await fetch('/api/visitor-count', { method: 'POST' });
        if (!response.ok) {
          throw new Error(`Visitor count request failed: ${response.status}`);
        }

        const { count } = await response.json();
        setVisits(count || 0);
        setLoading(false);
      } catch (error) {
        console.error('Error updating visitor count:', error);
        await fetchViewCount();
      }
    };

    handleIncrement();
  }, []);

  return { visits, loading };
}
