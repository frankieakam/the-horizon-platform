import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import Subheader from './components/Subheader';
import ThemeToggle from './components/ThemeToggle';
import Blog from './components/Blog';
import CategoryBlogs from './components/CategoryBlogs';
import { FaHandPointer } from "react-icons/fa";
import './App.css';

const App = () => {
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isCategoryOverlayOpen, setIsCategoryOverlayOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [articleReads, setArticleReads] = useState(() => {
    const savedReads = localStorage.getItem('articleReads');
    return savedReads ? JSON.parse(savedReads) : {};
  });

  const toggleBlog = () => setIsBlogOpen((prev) => !prev);
  const toggleCategoryOverlay = () => setIsCategoryOverlayOpen((prev) => !prev);

  const incrementReads = (id) => {
    setArticleReads((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  useEffect(() => {
    localStorage.setItem('articleReads', JSON.stringify(articleReads));
  }, [articleReads]);

  const blogs = [
    {
      id: 'blog1',
      title: 'International Competition: Art of 3D Graphics',
      author: 'Joseph Ntui',
      datePosted: '15th Oct 2024',
      dateModified: '2nd Jan 2025',
      preview: 'The International Competition for the Art of 3D Graphics kicks off this fall, bringing together top artists worldwide. Judged by experts in classical and modern art, the event promises stunning visuals and innovative techniques. Winners will be showcased in a global exhibition.',
      fullContent: 'The International Competition for the Art of 3D Graphics kicks off this fall, bringing together top artists worldwide. Judged by experts in classical and modern art, the event promises stunning visuals and innovative techniques. Winners will be showcased in a global exhibition hosted by The Horizon. Participants will compete across categories like animation, modeling, and real-time rendering, pushing the boundaries of digital creativity. The jury includes renowned figures from both traditional and tech-driven art scenes, ensuring a balanced evaluation. This event not only celebrates talent but also fosters collaboration in the growing 3D graphics community.',
      image: '/images/art-of-3d-graphics.jpeg',
      category: 'Tech Innovations',
    },
    {
      id: 'blog2',
      title: 'AI Revolution Unveiled at NVIDIA Expo',
      author: 'Frankie Akam',
      datePosted: '20th Sept 2024',
      dateModified: '27th Sept 2024',
      preview: 'NVIDIA’s latest expo unveiled groundbreaking AI advancements, from autonomous systems to real-time graphics. The tech giant showcased its new chips, promising faster processing and smarter algorithms, set to redefine industries.',
      fullContent: 'NVIDIA’s latest expo unveiled groundbreaking AI advancements, from autonomous systems to real-time graphics. The tech giant showcased its new chips, promising faster processing and smarter algorithms, set to redefine industries like gaming, healthcare, and automotive. Highlights included a demo of AI-driven 3D rendering that cuts production times in half, alongside a self-learning model for predictive analytics. Attendees were wowed by live simulations, hinting at a future where AI and human creativity merge seamlessly. The Horizon was on-site, capturing every moment of this tech milestone.',
      image: '/images/ai-nvidia-expo.jpeg',
      category: 'AI & Machine Learning',
    },
    {
      id: 'blog3',
      title: 'Tech Innovations Shaping 2025',
      author: 'Frankie Akam',
      datePosted: '1st Nov 2024',
      dateModified: '15th Dec 2024',
      preview: 'As 2025 approaches, new tech innovations are emerging. From quantum computing breakthroughs to sustainable energy solutions, this year’s advancements promise a transformative future for global industries.',
      fullContent: 'As 2025 approaches, new tech innovations are emerging. From quantum computing breakthroughs to sustainable energy solutions, this year’s advancements promise a transformative future for global industries. Key highlights include a compact quantum processor unveiled at CES, capable of solving complex problems in seconds, and a solar panel design that doubles efficiency. The Horizon predicts these technologies will drive economic shifts, with startups already prototyping applications. Experts weigh in on how these tools could reshape everything from healthcare diagnostics to urban planning in the next decade.',
      image: '/images/tech-innovations-shaping-2025.jpeg',
      category: 'Tech Innovations',
    },
    {
      id: 'blog4',
      title: 'The Rise of Tech Giants in 2024',
      author: 'Eji Etaba',
      datePosted: '10th Oct 2024',
      dateModified: '31st Dec 2024',
      preview: 'This year has seen tech giants solidify their dominance with new strategies and acquisitions, reshaping the industry landscape.',
      fullContent: 'This year has seen tech giants solidify their dominance with new strategies and acquisitions, reshaping the industry landscape. From AI-driven innovations to bold moves in hardware, companies like Google, NVIDIA, Amazon, and  Tesla are setting the pace. The Horizon dives into how these shifts impact startups, consumers, and the global market, with insider insights on what’s next.',
      image: '/images/tech-giants.jpg',
      category: 'Tech Insider',
    },
  ];

  return (
    <Router>
      <div className="app-container">
        <div className="layout">
          <Header
            toggleCategoryOverlay={toggleCategoryOverlay}
            setSelectedCategory={setSelectedCategory}
          />
          <Subheader />
          <div className="counter"> 
            The Horizon has gotten <br />
            <span style={{ color: '#007bff', fontWeight: '900', fontFamily: 'Share Tech Mono, monospace' }}>
              2.5M+
            </span>{' '}
            clicks <FaHandPointer /> from 60 countries
          </div>
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<MainContent onReadMore={toggleBlog} />} />
            </Routes>
            <Sidebar />
          </div>
          <ThemeToggle />
        </div>
        {isBlogOpen && (
          <Blog
            toggleBlog={toggleBlog}
            isBlogOpen={isBlogOpen}
            blogs={blogs}
            articleReads={articleReads}
            incrementReads={incrementReads}
          />
        )}
        {isCategoryOverlayOpen && (
          <CategoryBlogs
            toggleCategoryOverlay={toggleCategoryOverlay}
            isCategoryOverlayOpen={isCategoryOverlayOpen}
            category={selectedCategory}
            blogs={blogs}
            articleReads={articleReads} // pass read counts
            incrementReads={incrementReads} // pass increment function
          />
        )}
      </div>
    </Router>
  );
};

export default App;