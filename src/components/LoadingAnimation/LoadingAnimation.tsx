import { useEffect, useState } from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-container">
      <div className="loading-text">NS</div>
    </div>
  );
};

export default LoadingAnimation;