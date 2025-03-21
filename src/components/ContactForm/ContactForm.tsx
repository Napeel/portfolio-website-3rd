import { useState, FormEvent } from 'react';
import emailjs from 'emailjs-com';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    user_name: '',    // Changed from 'name' to match EmailJS template fields
    user_email: '',   // Changed from 'email' to match EmailJS template fields
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const result = await emailjs.sendForm(
        'service_1eniioi',
        'template_hdhpgnd',
        e.currentTarget,
        'q6pvZ-wbdpyeXvk9E'
      );
      
      console.log('Email sent!', result.text);
      setFormData({ user_name: '', user_email: '', subject: '', message: '' }); // Updated keys
      setStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>
        <span className="accent">Contact</span> Me
      </h2>
      <p className="form-subtitle">Have a question or want to work together?</p>
      
      {status === 'success' && (
        <div className="status-message success">
          <svg viewBox="0 0 24 24" className="status-icon">
            <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          <span>Message sent successfully!</span>
        </div>
      )}
      
      {status === 'error' && (
        <div className="status-message error">
          <svg viewBox="0 0 24 24" className="status-icon">
            <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          <span>Something went wrong. Please try again later.</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={status === 'sending' ? 'sending' : ''}>
        <div className="form-group">
          <label htmlFor="user_name">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="user_email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">
            <span className="label-text">Subject</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="What's this about?"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">
            <span className="label-text">Message</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            placeholder="Your message here..."
          />
        </div>
        
        <button 
          type="submit" 
          disabled={status === 'sending'}
          className="submit-button"
        >
          {status === 'sending' ? (
            <>
              <span className="loading-spinner"></span>
              <span className="button-text">Sending...</span>
            </>
          ) : (
            <span className="button-text">Send Message</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;