import { useState, useRef, useEffect } from 'react';
import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation';
import LinkItem from './components/LinkItem/LinkItem';;
import './App.css';
import EmailItem from './components/EmailItem/EmailItem';
import WinnerText from './components/WinnerText/WinnerText';
import emailjs from 'emailjs-com';
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card";
import "./globals.css"; // Make sure this is imported to apply Tailwind styles

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
    projects: useSection(),
    contact: useSection()
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
          <p>
            Hey. I'm a software engineer based in Montreal, part of the Software Engineering Co-op program at McGill University.
            I'm currently working as a frontend developer at&nbsp;
            <a 
              href="https://www.empor.ca/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-color)', textDecoration: 'none' }}
            >
              Empor
            </a>
            &nbsp;check it out! Don't hesitate to send me a message—I'm always open to chat!
          </p>
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
                  href="https://www.empor.ca/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-title-link"
                >
                  Empor
                  <svg className="external-link-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              </span>
              <span className="project-date">Feb 2025 - Present</span>
            </div>
            <p className="project-description">
              <span className="project-role">Software Engineer Intern</span>
              <span className="project-details">
                Leveraging Next.js, React, and TypeScript to build dynamic, responsive UIs for empor.ca.
              </span>
            </p>
          </div>

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
              <WinnerText /> of Telus Sponsor Challenge at&nbsp;
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
        <div ref={sections.contact.ref} className={`section ${sections.contact.visible ? 'visible' : ''}`}>
          <h2 className="text-center text-3xl font-semibold text-primary">Contact Me</h2>
          <p className="text-center opacity-80 mb-8">Have a question or want to work together?</p>
          
          <Card className="mx-auto max-w-md bg-black/30 border-accent">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Get in touch</CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="user_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background border-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="user_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-background border-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-background border-input resize-none"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-accent text-black hover:bg-accent/80">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
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