import { useState, useRef, useEffect } from 'react';
import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation';
import LinkItem from './components/LinkItem/LinkItem';;
import './App.css';
import EmailItem from './components/EmailItem/EmailItem';
import WinnerText from './components/WinnerText/WinnerText';
import emailjs from 'emailjs-com';

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
  const [contentVisible, setContentVisible] = useState(false);
  const sections = {
    header: useSection(),
    about: useSection(),
    skills: useSection(),
    projects: useSection()
  };

  useEffect(() => {
    setTimeout(() => {
      setContentVisible(true);
    }, 2000);
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_1eniioi',
      'template_hdhpgnd',
      e.currentTarget,
      'q6pvZ-wbdpyeXvk9E'
    )
    .then((result) => {
      console.log('Email sent!', result.text);
      alert("Message sent successfully!");
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, (error) => {
      console.error('Email send error:', error.text);
      alert("There was an error sending your message, please try again later.");
    });
  };

  return (
    <>
      <LoadingAnimation />
      <div className={`content-container ${contentVisible ? 'visible' : ''}`}>
        <div ref={sections.header.ref} className={`section ${sections.header.visible ? 'visible' : ''}`}>
          <h1>Nabil Muzafar Shah</h1>
          <p>Software Engineer</p>
          <p className="disclaimer-text">website is still a work in progress and not fully updated!</p>
        </div>

        <div ref={sections.about.ref} className={`section ${sections.about.visible ? 'visible' : ''}`}>
          <h2>About</h2>
          <p>Hey. I'm a software engineer based in Montreal, part of the Software Engineering Co-op program at McGill University. Don't hesitate to send me a message I'm always open to chat!</p>
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
              <WinnerText /> of Telus Sponsor Challenge at{" "}
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
              Built with TypeScript, React, Python. Interactive app for visualizing blood test results through intuitive charts with AI-powered private chat.
            </p>
          </div>

          <div className="project-item">
            <div className="project-header">
              <span className="project-title">Emotiflix</span>
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

         {/* Contact Form */}
         <div className="contact-form-container">
          <h2>Contact Me</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="user_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Hidden Message */}
        <div className="hidden-message">
          You've made it to the bottom, now what?
        </div>
      </div>
    </>
  );
};

export default App;