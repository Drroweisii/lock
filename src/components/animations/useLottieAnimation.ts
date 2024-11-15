import { useState, useEffect } from 'react';

export function useLottieAnimation(url: string) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAnimation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch animation');
        const data = await response.json();
        if (isMounted) {
          setAnimationData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load animation'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAnimation();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { animationData, isLoading, error };
}