import React from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const MainContent = ({ onReadMore }) => {
  return (
    <div className="main-content">
      <h6 className="tech-notation">AI</h6>
      <h1>Amazon unveiled: <br />  
      "Alexa+" with <br /> 
      generative AI integration</h1>
      <div className='main-content-div'>
        <p>
          An upgraded version of its voice assistant powered by generative AI. <br />
          This enhancement allows Alexa to engage in more natural, <br />
          conversational interactions, making it more intuitive and responsive. <br />
          The AI integration improves contextual understanding, personalization, <br />
          and overall user experience, positioning Alexa as a smarter digital assistant.
        </p>
        <button className="read-more-button" onClick={onReadMore}>
          Read more <FaArrowUpRightFromSquare />
        </button>
      </div>
    </div>
  );
};

export default MainContent;