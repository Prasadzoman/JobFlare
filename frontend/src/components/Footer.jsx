import React from "react";


const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Prasad Zoman. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <a href="mailto:your.email@example.com">
            <i className="fas fa-envelope"></i> Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
