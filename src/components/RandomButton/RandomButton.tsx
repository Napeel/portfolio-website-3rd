import { useState } from 'react';

const RandomButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const animationElement = document.createElement('div');
    animationElement.className = `full-window-animation animation-matrix`;
    document.body.appendChild(animationElement);

    setTimeout(() => {
      document.body.removeChild(animationElement);
      setIsAnimating(false);
    }, 1200);
  };

  return (
    <button 
      className="triangle-button"
      onClick={triggerAnimation}
      style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
      aria-label="Trigger animation"
    >
      <svg viewBox="0 0 10 10" className="triangle-icon">
        <path d="M5 0L10 10H0z" fill="currentColor" />
      </svg>
    </button>
  );
};

export default RandomButton;