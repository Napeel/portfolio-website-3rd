import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options = { threshold: 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isVisible];
};

export default useIntersectionObserver;