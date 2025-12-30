import { doc, increment, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { db } from '../fireBase.js'; // Import your config

export default function useVisitorCount() {
  const [visits, setVisits] = useState(0);
  const [loading, setLoading] = useState(true);
  const hasIncremented = useRef(false); // Prevents double-counting in React Strict Mode

  useEffect(() => {
    const docRef = doc(db, "portfolio", "stats"); // Collection: 'portfolio', Doc: 'stats'
    const VISITOR_KEY = 'visitor_timestamp';
    const EXPIRY_TIME = 30 * 24 * 60 * 60 * 1000; // ~30 days

    // 1. Set up Real-time Listener (READ)
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setVisits(docSnap.data().count || 0);
      } else {
        setVisits(0);
      }
      setLoading(false);
    });

    // 2. Handle Increment Logic (WRITE)
    const handleIncrement = async () => {
      // Prevent running twice in development
      if (hasIncremented.current) return;

      const storedData = localStorage.getItem(VISITOR_KEY);
      const currentTime = new Date().getTime();
      let shouldIncrement = false;

      if (!storedData) {
        shouldIncrement = true;
      } else {
        const { timestamp } = JSON.parse(storedData);
        if (currentTime - timestamp > EXPIRY_TIME) {
          shouldIncrement = true;
        }
      }

      if (shouldIncrement) {
        hasIncremented.current = true; // Mark as processed in memory

        try {
          // Update Local Storage immediately to block subsequent reloads
          localStorage.setItem(VISITOR_KEY, JSON.stringify({
            visited: true,
            timestamp: currentTime
          }));

          // Atomic increment in Firestore
          // setDoc with merge:true ensures the document is created if it doesn't exist
          await setDoc(docRef, { count: increment(1) }, { merge: true });

        } catch (error) {
          console.error("Error updating visitor count:", error);
        }
      }
    };

    handleIncrement();

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return { visits, loading };
}
