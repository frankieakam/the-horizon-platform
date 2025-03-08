import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? true : false; 
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  useEffect(() => {
    // document.body.style.backgroundColor = isDarkMode ? 'gray' : 'lightgray';
    // document.body.style.color = isDarkMode ? 'white' : 'black';
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Determine positions based on theme mode
  const sunPosition = isDarkMode
  ? { top: '0', right: '0', transform: 'none' }  
  : { top: '1.5em', left: '1.5em', transform: 'none' }; 

  const moonPosition = isDarkMode
  ? { top: '1.5em', left: '1.5em', transform: 'none' } 
  : { top: '0', right: '0', transform: 'none' }; 

  return (
    <div className={`theme-toggle-container ${isDarkMode ? 'dark' : 'light'}`} onClick={toggleTheme}>
      <div className="sun" style={sunPosition}></div>
      <div className="satelite"></div>
      <div className="moon" style={moonPosition}></div>
    </div>
  );
};

export default ThemeToggle;