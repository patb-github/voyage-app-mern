import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <p>© 2014-2024 Voyage. All rights reserved.</p>
      </div>
    </footer>
  );
};

const FooterSection = ({ title, links }) => (
  <div>
    <h3 className="footer-title">{title}</h3>
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="link link-hover">
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
