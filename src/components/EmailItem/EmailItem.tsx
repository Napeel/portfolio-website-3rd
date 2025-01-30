import { useState } from 'react';
import './EmailItem.css';

interface EmailItemProps {
  email: string;
}

const EmailItem = ({ email }: EmailItemProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      className={`email-container ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
      aria-label="Copy email to clipboard"
    >
      <div className="link-icon">
        <svg viewBox="0 0 24 24" className="icon">
          <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </div>
      <span className="link-text">
        {email}
        <span className="copy-indicator">
          {copied ? 'Copied!' : 'Click to copy'}
        </span>
      </span>
    </button>
  );
};

export default EmailItem;