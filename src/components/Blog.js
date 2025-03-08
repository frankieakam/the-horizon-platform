import React, { useState, useEffect, useRef } from 'react';
import { FaEye, FaHeart, FaComment, FaFacebookF, FaWhatsapp, FaXTwitter, FaRedditAlien, FaLink } from 'react-icons/fa6';

const Blog = ({ toggleBlog, isBlogOpen, blogs, articleReads, incrementReads }) => {
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const [articleLikes, setArticleLikes] = useState(() => {
    const savedLikes = localStorage.getItem('articleLikes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  const [articleComments, setArticleComments] = useState(() => {
    const savedComments = localStorage.getItem('articleComments');
    return savedComments ? JSON.parse(savedComments) : {};
  });
  const [commentsData, setCommentsData] = useState(() => {
    const savedCommentsData = localStorage.getItem('commentsData');
    return savedCommentsData ? JSON.parse(savedCommentsData) : {};
  });
  const [activeCommentBlog, setActiveCommentBlog] = useState(null);
  const observerRef = useRef([]);

  useEffect(() => {
    localStorage.setItem('articleLikes', JSON.stringify(articleLikes));
  }, [articleLikes]);

  useEffect(() => {
    localStorage.setItem('articleComments', JSON.stringify(articleComments));
  }, [articleComments]);

  useEffect(() => {
    localStorage.setItem('commentsData', JSON.stringify(commentsData));
  }, [commentsData]);

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
  }, [blogs]);

  const [visibleArticles, setVisibleArticles] = useState({});

  const toggleBlogContent = (id) =>
    setExpandedBlogs((prev) => ({ ...prev, [id]: !prev[id] }));

  const incrementLikes = (id) => {
    setArticleLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const toggleCommentSection = (id) => {
    setActiveCommentBlog((prev) => (prev === id ? null : id));
  };

  const addComment = (id, name, comment) => {
    const newComment = { name, comment, timestamp: new Date().toISOString() };
    setCommentsData((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment],
    }));
    setArticleComments((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    setActiveCommentBlog(null);
  };

  const shareToFacebook = (id, title) => {
    const url = `${window.location.origin}/blog/${id}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
  };

  const shareToWhatsApp = (id, title) => {
    const url = `${window.location.origin}/blog/${id}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - ' + url)}`, '_blank');
  };

  const shareToX = (id, title) => {
    const url = `${window.location.origin}/blog/${id}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToReddit = (id, title) => {
    const url = `${window.location.origin}/blog/${id}`;
    window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
  };

  const copyLink = (id) => {
    const url = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className={`blog-overlay ${isBlogOpen ? 'open' : ''}`}>
      <div className="blog-content">
        <div className="blog-close" onClick={toggleBlog}>X</div>
        <h6 className="tech-notation">Blog</h6>
        <h1>The Horizon <br /> Platform</h1>
        <div className="blog-content-wrapper">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              ref={(el) => (observerRef.current[index] = el)}
              data-id={blog.id}
              className={`blog-article ${visibleArticles[blog.id] ? 'visible' : ''}`}
              onClick={() => incrementReads(blog.id)}
            >
              <img src={blog.image} alt={blog.title} className="blog-image" />
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
              <div className="blog-actions">
                <button onClick={(e) => { e.stopPropagation(); incrementLikes(blog.id); }} className="action-button">
                  <FaHeart /> {articleLikes[blog.id] || 0}
                </button>
                <button onClick={(e) => { e.stopPropagation(); toggleCommentSection(blog.id); }} className="action-button">
                  <FaComment /> {articleComments[blog.id] || 0}
                </button>
                <button onClick={(e) => { e.stopPropagation(); shareToFacebook(blog.id, blog.title); }} className="action-button">
                  <FaFacebookF />
                </button>
                <button onClick={(e) => { e.stopPropagation(); shareToWhatsApp(blog.id, blog.title); }} className="action-button">
                  <FaWhatsapp />
                </button>
                <button onClick={(e) => { e.stopPropagation(); shareToX(blog.id, blog.title); }} className="action-button">
                  <FaXTwitter />
                </button>
                <button onClick={(e) => { e.stopPropagation(); shareToReddit(blog.id, blog.title); }} className="action-button">
                  <FaRedditAlien />
                </button>
                <button onClick={(e) => { e.stopPropagation(); copyLink(blog.id); }} className="action-button">
                  <FaLink />
                </button>
              </div>
              {activeCommentBlog === blog.id && (
                <div className="comment-section">
                  <div className="existing-comments">
                    {(commentsData[blog.id] || []).map((comment, idx) => (
                      <div key={idx} className="comment">
                        <p><strong>{comment.name}</strong> ({new Date(comment.timestamp).toLocaleString()}): {comment.comment}</p>
                      </div>
                    ))}
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const name = e.target.name.value;
                      const comment = e.target.comment.value;
                      if (name && comment) {
                        addComment(blog.id, name, comment);
                        e.target.reset();
                      }
                    }}
                  >
                    <input type="text" name="name" placeholder="Your Name" className="comment-input" />
                    <textarea name="comment" placeholder="Your Comment" className="comment-textarea" />
                    <button type="submit" className="comment-submit">Submit</button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;