import { useState, useEffect } from 'react';
import { client } from "./client";

export const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(url);
        setData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError('Failed to fetch user details');
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
