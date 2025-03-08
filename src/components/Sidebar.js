import React, { useState, useEffect } from 'react';
import { FaArrowTrendUp  } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

const Sidebar = () => {
  const initialCount = 5128; // target starting count
  const incrementValue = 568; // increment by 568 each time
  const intervalTime = 2000; // update every 2 seconds

  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    let tempCount = 0;
    const fastIncrease = setInterval(() => {
      tempCount += 100; // fast count increase step in 10ms i.e 1 second
      setViewCount(tempCount);
      if (tempCount >= initialCount) {
        clearInterval(fastIncrease);
        setViewCount(initialCount);
        // start normal incrementing after reaching initial count
        const normalInterval = setInterval(() => {
          setViewCount((prevCount) => prevCount + incrementValue);
        }, intervalTime);
        return () => clearInterval(normalInterval);
      }
    }, 50); // fast count increase speed in 50ms i.e 5 seconds

    return () => clearInterval(fastIncrease);
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <h6 className="tech-notation">Insights</h6>
        <span className="sidebar-arrow" ><FaArrowTrendUp /></span>
        <h3>Geopolitical Impact</h3>
        <p>
        Trump’s tariffs and chip controls on China may slow tech growth or raise costs, but U.S. investments like TSMC and Apple signal a push for domestic tech leadership.
        </p>
        <div className="sidebar-meta">
          <span>posted 20th Sept. 2024</span>
          <span><FaEye /> {viewCount}</span> 
        </div>
      </div>
      <div className='sidebar-img'>
        <img src='./images/tsmc.jpeg' alt='TSMC' />
      </div>
    </div>
  );
};

export default Sidebar;

