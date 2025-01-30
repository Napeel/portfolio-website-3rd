import { useState, useEffect, useRef } from 'react';

interface ProjectContainerProps {
  title: string;
  description: string;
  technologies: string;
}

const ProjectContainer = ({ title, description, technologies }: ProjectContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 7000);
  };

  return (
    <div 
      className="project-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="project-title">{title}</h3>
      <div 
        ref={contentRef}
        className={`project-content ${isHovered ? 'visible' : ''}`}
        style={{ 
          height: isHovered ? contentRef.current?.scrollHeight + 'px' : '0'
        }}
      >
        <p>{description}</p>
        <p>{technologies}</p>
      </div>
    </div>
  );
};

export default ProjectContainer;