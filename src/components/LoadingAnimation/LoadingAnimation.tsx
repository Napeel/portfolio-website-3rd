import { useEffect, useState } from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsHidden(true), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isHidden) return null;

  return (
    <div className={`loading-container ${!isLoading ? 'fade-out' : ''}`}>
      <div className="loading-shape"></div>
    </div>
  );
};

export default LoadingAnimation;