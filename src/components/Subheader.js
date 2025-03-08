import React, { useState, useEffect } from 'react';
import { FaXTwitter, FaFacebookF, FaInstagram, FaRedditAlien } from 'react-icons/fa6';

const Subheader = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      // adjust to west african time (UTC+1)
      const options = {
        timeZone: 'Africa/Lagos', // nigeria uses WAT (UTC+1)
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      const formattedDate = now.toLocaleDateString('en-US', options).replace(/,/, ',');
      setCurrentDate(formattedDate);
    };

    updateDate(); // set initial date
    const interval = setInterval(updateDate, 1000); // update every second for real-time 

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="subheader">
      <span>{currentDate}</span>
      <div className="breaking-news">
        <span className="news-text">Breaking: China Unveils Advanced 'Invisible Defense' Cloak Technology</span>
      </div>
      <div className="social-icons">
        <a
          href="https://x.com/the_horizonplatform"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (formerly Twitter)"
        >
          <FaXTwitter className="social-icon" />
        </a>
        <a
          href="https://facebook.com/thehorizonplatform"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF className="social-icon" />
        </a>
        <a
          href="https://instagram.com/the_horizonplatform"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="social-icon" />
        </a>
        <a
          href="https://reddit.com/r/the_horizonplatform"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Reddit"
        >
          <FaRedditAlien className="social-icon" />
        </a>
      </div>
    </div>
  );
};

export default Subheader;