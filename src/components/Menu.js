import React, { useState } from 'react';
import { FaXTwitter, FaFacebookF, FaInstagram, FaEnvelope, FaRedditAlien } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const Menu = ({ isOpen, toggleMenu, toggleCategoryOverlay, setSelectedCategory }) => { // added props
  const [openSection, setOpenSection] = useState(null); // track which section is open
  const navigate = useNavigate();

  const toggleSection = (section) =>
    setOpenSection((prev) => (prev === section ? null : section));

  const categories = [
    { name: 'AI & Machine Learning', path: '/category/ai' },
    { name: 'Tech Insider', path: '/category/tech-insider' },
    { name: 'Tech Innovations', path: '/category/tech-innovations' },
  ];

  const contactItems = [
    { label: 'Email', value: 'contact@thehorizonplatform.com', icon: <FaEnvelope /> },
    { label: 'X (formerly Twitter)', value: '@the_horizonplatform', icon: <FaXTwitter />, link: 'https://x.com/the_horizonplatform' },
    { label: 'Facebook', value: 'The Horizon platform', icon: <FaFacebookF />, link: 'https://facebook.com/thehorizonplatform' },
    { label: 'Instagram', value: '@the_horizonplatform', icon: <FaInstagram />, link: 'https://instagram.com/the_horizonplatform' },
    { label: 'Reddit', value: '@the_horizonplatform', icon: <FaRedditAlien />, link: 'https://reddit.com/r/the_horizonplatform' },
  ];

  const team = [
    { name: 'Frankie Akam', bio: 'Currently focused on front-end web development, building innovative tools and applications that solve real-world problems', photo: 'images/frankie-removebg-preview.png' },
    { name: 'Joseph Ntui', bio: 'Highly motivated and detail-oriented front-end developer with reasonable experience in building responsible, user-friendly, and visually appealing web application', photo: 'images/joseph-photo-removebg-preview.png' },
    { name: 'Eji Etaba', bio: 'Specialize in crafting innovative digital solutions that drive user engagement and business growth', photo: 'images/eji-removebg-preview.png' },
  ];

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName); // set the clicked category
    toggleCategoryOverlay(); // open the category overlay
    toggleMenu(); // close the menu
  };

  const handleHomeClick = () => {
    navigate('/'); // navigate to home page
    toggleMenu(); // close menu after navigation
  };

  return (
    <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
      <div className="menu-content">
        <div className="menu-close" onClick={toggleMenu}>X</div>

        {/* home */}
        <div className="menu-section">
          <h3 onClick={handleHomeClick}> 
            Home 
          </h3> 
        </div>

        {/* categories */}
        <div className="menu-section">
          <h3 onClick={() => toggleSection('categories')}>
            Categories {openSection === 'categories' ? '▲' : '▼'} 
          </h3>
          <div className={`menu-dropdown ${openSection === 'categories' ? 'open' : ''}`}>
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="menu-item"
                onClick={() => handleCategoryClick(cat.name)} // pass category name
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        {/* about team */}
        <div className="menu-section">
          <h3 onClick={() => toggleSection('team')}>
            About Team {openSection === 'team' ? '▲' : '▼'}
          </h3>
          <div className={`menu-dropdown ${openSection === 'team' ? 'open' : ''}`}>
            <div className="team-container">
              {team.map((member) => (
                <div key={member.name} className="team-member">
                  <img src={member.photo} alt={member.name} />
                  <h4>{member.name}</h4>
                  <p>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* about the horizon */}
        <div className="menu-section">
          <h3 onClick={() => toggleSection('about')}>
            About The Horizon {openSection === 'about' ? '▲' : '▼'}
          </h3>
          <div className={`menu-dropdown ${openSection === 'about' ? 'open' : ''}`}>
            <div className="about-container">
              <div className="horizon-logo"></div>
              <p>
                The Horizon is a cutting-edge tech blog platform exploring the future of technology. <br />
                Founded by a passionate team, we aim to inspire and inform tech enthusiasts worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* contact */}
        <div className="menu-section">
          <h3 onClick={() => toggleSection('contact')}>
            Contact {openSection === 'contact' ? '▲' : '▼'}
          </h3>
          <div className={`menu-dropdown ${openSection === 'contact' ? 'open' : ''}`}>
            {contactItems.map((item) => (
              <div key={item.label} className="contact-item">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.icon} {item.value}
                  </a>
                ) : (
                  <span>
                    {item.icon} {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;