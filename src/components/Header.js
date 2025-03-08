import React, { useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import Menu from './Menu'; 

const Header = ({ toggleCategoryOverlay, setSelectedCategory }) => { // Added props
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <header>
        <div className="logo-text">The H<span>●</span>rizon Platform
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          Menu <FaBarsStaggered />
        </div>
      </header>
      <Menu 
        isOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        toggleCategoryOverlay={toggleCategoryOverlay} // pass prop
        setSelectedCategory={setSelectedCategory}   // pass prop
      />
    </>
  );
};

export default Header;