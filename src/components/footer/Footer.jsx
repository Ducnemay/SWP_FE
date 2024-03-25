// Footer.js

import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h2>About us</h2>
        <div className="footer-links">
          <a href="/about-us">About</a>
          <a href="/jobs">Jobs</a>
          <a href="/press">Press</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
      
      <div className="footer-section">
        <h2>Resources</h2>
        <div className="footer-links">
   
          <a href="/open-source">Open Source</a>
          <a href="/blog">Blog</a>
          <a href="/the-art-genome-project">The Art Genome Project</a>
        </div>
      </div>
      <div className="footer-section">
        <h2>Partnerships</h2>
        <div className="footer-links">
          <a href="/partnerships">Partnerships</a>
          <a href="/artsy-for-galleries">Artsy for Galleries</a>
          <a href="/artsy-for-museums">Artsy for Museums</a>
          <a href="/artsy-for-auctions">Artsy for Auctions</a>
          <a href="/artsy-for-fairs">Artsy for Fairs</a>
        </div>
      </div>
      <div className="footer-section">
        <h2>Support</h2>
        <div className="footer-links">
          <a href="/support">Support</a>
          <a href="/talk-to-a-specialist">Talk to a Specialist</a>
          <a href="/help-center">Visit our Help Center</a>
          <a href="/buying-on-artsy">Buying on Artsy</a>
        </div>
      </div>
      <div className="footer-section">
        <h2> Get The Apps</h2>
        <div className="footer-links">
          <a href="/ios-app">iOS App</a>
          <a href="/android-app">Android App</a>
        </div>
      </div>
     
    </footer>
  );
};

export default Footer;
