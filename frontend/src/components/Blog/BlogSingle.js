import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MagneticButton from '../Miscellaneous/MagneticButton';
import BlogSection from '../Blog/BlogRelated';

const BlogSingle = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch post data using axios
    axios
      .get('https://my-json-server.typicode.com/themeland/infosuraj-json-2/blogSingle')
      .then((response) => {
        setPost(response.data[0]); // Assuming response.data is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="blog-single pb-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {/* Post Meta */}
            <div className="portfolio-meta d-flex align-items-center">
              <div className="portfolio-terms">
                {post.tags.map((tag, index) => (
                  <a key={index} className="terms" href="/blog">
                    {tag}
                  </a>
                ))}
              </div>
              <span className="date">4 mins read</span>
            </div>
            <h2 className="title">{post.title}</h2>
            {/* Meta Content */}
            <div className="content item d-flex flex-column flex-md-row">
              <div className="author d-flex align-items-start">
                <img src="/img/logo.png" alt="Author" />
                <div className="content ms-3">
                  <h6 className="title mt-0 mb-2">Author</h6>
                  <span><strong>{post.author}</strong></span>
                </div>
              </div>

              <div className="published ms-sm-4 my-3 my-sm-0">
                <h6 className="title mt-0 mb-2">Published</h6>
                <span>{post.date}</span>
              </div>

              <div className="comments socials ms-sm-4">
                <h6 className="title mt-0 mb-2">0 Comments</h6>
                <a className="nav-link d-inline-flex smooth-anchor m-0" href="#comments">
                  Join the conversation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="row justify-content-center portfolio-content">
          <div className="col-12">
            {post.content.map((item, index) => {
              switch (item.type) {
                case 'paragraph':
                  return <p key={index}>{item.text}</p>;
                case 'image':
                  return <div key={index} className="post-thumbnail"><img className="w-100" src={item.src} alt={item.alt} /></div>;
                case 'heading':
                  return <h3 key={index}>{item.text}</h3>;
                case 'list':
                  return (
                    <ul key={index}>
                      {item.items.map((listItem, i) => (
                        <li key={i}>{listItem}</li>
                      ))}
                    </ul>
                  );
                case 'blockquote':
                  return <blockquote key={index}>{item.text}</blockquote>;
                case 'code':
                  return (
                    <pre key={index}>
                      <code>{item.text}</code>
                    </pre>
                  );
                case 'table':
                  return (
                    <table key={index}>
                      <thead>
                        <tr>
                          {item.headers.map((header, i) => (
                            <th key={i}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {item.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                default:
                  return null;
              }
            })}

            {/* Tags */}
            <div className="post-holder-tags d-flex flex-column flex-md-row align-items-md-center mt-5">
              <span className="tagged">Tagged with:</span>
              <div className="tags mt-2 mt-sm-0 ms-sm-3">
                {post.tags.map((tag, index) => (
                  <a key={index} className="badge mx-md-1" href="/blog" rel="tag">
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

	  <BlogSection />

      {/* Comments Section */}
      <section id="comments" className="comments primary-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <h3 className="comments-reply-text mt-0 mb-3">Leave a Reply</h3>
              <p className="mt-3">Sed mauris nulla, tempor eu est vel, dapibus hendrerit mauris.</p>

              <form id="contact-form" className="contact-form p-0">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="name" placeholder="Name" />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-4">
                  <textarea className="form-control" id="comment" placeholder="Leave a comment here" style={{ height: '100px' }}></textarea>
                  <label htmlFor="comment">Comment</label>
                </div>
				<MagneticButton 
					href="/#"
					>
					Post Comment
				</MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default BlogSingle;
