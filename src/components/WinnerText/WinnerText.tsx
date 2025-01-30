import { useEffect, useRef, useState } from 'react';
import './WinnerText.css';

const WinnerText = () => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <span 
      ref={textRef} 
      className={`winner-text ${isVisible ? 'animate' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Winner
      {isHovered && (
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="confetti"
              style={{
                '--delay': `${Math.random()}s`,
                '--left': `${Math.random() * 100}%`,
                '--hue': `${Math.random() * 360}deg`
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </span>
  );
};

export default WinnerText;