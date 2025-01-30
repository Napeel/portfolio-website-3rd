import { useState, useRef, useEffect } from 'react';
import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation';
import LinkItem from './components/LinkItem/LinkItem';
import RandomButton from './components/RandomButton/RandomButton';
import './App.css';
import EmailItem from './components/EmailItem/EmailItem';


const useSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

const App = () => {
  const sections = {
    header: useSection(),
    about: useSection(),
    skills: useSection(),
    projects: useSection()
  };

  return (
    <>
      <LoadingAnimation />
      <div className="container">
        <div ref={sections.header.ref} className={`section ${sections.header.visible ? 'visible' : ''}`}>
          <h1>Nabil Muzafar Shah</h1>
          <p>Software Engineer</p>
        </div>

        <div ref={sections.about.ref} className={`section ${sections.about.visible ? 'visible' : ''}`}>
          <h2>About</h2>
          <p>Hey. I'm a software engineer based in Montreal, part of the Software Engineering Co-op program at McGill University.</p>
          <div className="social-links-container">
            <LinkItem 
              platform="github"
              href="https://github.com/Napeel"
              username="@Napeel"
            />
            <EmailItem 
              email="nabil111203@gmail.com"
            />
            <LinkItem 
              platform="linkedin"
              href="https://www.linkedin.com/in/nabilmus/"
              username="Nabil Muzafar Shah"
            />
          </div>
        </div>

        <div ref={sections.skills.ref} className={`section ${sections.skills.visible ? 'visible' : ''}`}>
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <div className="skills-category">Languages</div>
            <div className="skills-list">Python, Java, C++, C#, C, HTML, Javascript, CSS, TypeScript</div>
            <div className="skills-category">Tools</div>
            <div className="skills-list">Git, Github, AWS, React, Spring Boot, Flask, Tailwind</div>
          </div>
        </div>

        <div ref={sections.projects.ref} className={`section ${sections.projects.visible ? 'visible' : ''}`}>
          <h2>Projects/Experience</h2>
          <div className="project-item">
            <div className="project-header">
              <span className="project-title">
                <a 
                  href="https://devpost.com/software/vitals-me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-title-link"
                >
                  Vitals.me
                  <svg className="external-link-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              </span>
              <span className="project-date">Jan 2025</span>
            </div>
            <p className="project-description">
              Winner of Telus Sponsor Challenge at{" "}
              <a 
                href="https://mchacks-12.devpost.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-link"
              >
                McHacks2025
                <svg className="external-link-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>. 
              Built with TypeScript, React, Python. Interactive frontend for visualizing blood test results through intuitive charts with AI-powered private chat.
            </p>
          </div>

          <div className="project-item">
            <div className="project-header">
              <span className="project-title">Emoflix</span>
              <span className="project-date">Aug 2024 - Present</span>
            </div>
            <p className="project-description">
              Full-stack movie recommendation platform using FastAPI, PostgreSQL, and React.
              Features JWT authentication and optimized recommendation engine.
            </p>
          </div>

          <div className="project-item">
            <div className="project-header">
              <span className="project-title">
                <a 
                  href="https://www.mcgillrocketteam.com/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-title-link"
                >
                  McGill Rocket Team
                  <svg className="external-link-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              </span>
              <span className="project-date">Sep 2024 - Present</span>
            </div>
            <p className="project-description">
              Custom plugin development for real-time LabJack telemetry using React and TypeScript.
              Built mission control software GUI for data visualization and sensor monitoring.
            </p>
          </div>
        </div>
      </div>
      <RandomButton />
    </>
  );
};

export default App;