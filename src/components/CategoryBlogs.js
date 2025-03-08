import React, { useState, useEffect, useRef } from 'react';
import { FaEye } from 'react-icons/fa';

const CategoryBlogs = ({ toggleCategoryOverlay, isCategoryOverlayOpen, category, blogs, articleReads, incrementReads }) => {
  const [visibleArticles, setVisibleArticles] = useState({});
  const [expandedBlogs, setExpandedBlogs] = useState({}); // track expanded state
  const observerRef = useRef([]);

  const filteredBlogs = blogs.filter(blog => blog.category === category);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            setVisibleArticles((prev) => ({ ...prev, [id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredBlogs]);

  const toggleBlogContent = (id) =>
    setExpandedBlogs((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className={`category-overlay ${isCategoryOverlayOpen ? 'open' : ''}`}>
      <div className="category-content">
        <div className="category-close" onClick={toggleCategoryOverlay}>X</div>
        <h6 className="tech-notation">{category}</h6>
        <h1>{category} <br /> Blog Posts</h1>
        <div className="category-content-wrapper">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                ref={(el) => (observerRef.current[index] = el)}
                data-id={blog.id}
                className={`category-article ${visibleArticles[blog.id] ? 'visible' : ''}`}
                onClick={() => incrementReads(blog.id)}
              >
                <img src={blog.image} alt={blog.title} className="category-image" />
                <h2>{blog.title}</h2>
                <div className="article-meta">
                  <span style={{backgroundColor: '#007bff', padding: '5px 10px', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', color: 'black'}}>By {blog.author}</span>
                  <span style={{backgroundColor: 'red', padding: '5px 10px', color: 'black'}}><FaEye /> {articleReads[blog.id] || 0} reads</span>
                  <span style={{backgroundColor: 'yellow', padding: '5px 10px', color: 'black'}}>Posted: {blog.datePosted}</span>
                  <span style={{backgroundColor: 'green', padding: '5px 10px', borderTopRightRadius: '5px', borderBottomRightRadius: '5px', color: 'black'}}>Modified: {blog.dateModified}</span>
                </div>
                <p>{expandedBlogs[blog.id] ? blog.fullContent : blog.preview}</p>
                <div
                  className="see-more"
                  onClick={(e) => { e.stopPropagation(); toggleBlogContent(blog.id); }}
                >
                  {expandedBlogs[blog.id] ? 'See less' : 'See more'}
                </div>
              </div>
            ))
          ) : (
            <p>No blog posts available for this category yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryBlogs;