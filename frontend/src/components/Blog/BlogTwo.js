import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { transformImageKitUrl } from '../../utils/ImageKitUrlModify'; // Import the utility function

const BlogTwo = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        // Fetch data from the API when the component mounts
        axios.get(`${baseUrl}/blogs`)
        .then(response => {
            setBlogs(response.data.reverse());
        })
        .catch(error => {
            console.error("There was an error fetching the blog data!", error);
            // You might want to set an error state here if you need to display specific error messages
        })
        .finally(() => {
            setIsLoading(false); // Set loading to false after the fetch attempt
        });
    }, []);

    // If still loading, you can display a loading indicator or null
    if (isLoading) {
        return <p>Loading blogs...</p>; // Or null, depending on desired user experience
    }

    // If no blogs are fetched after loading, display the "coming soon" message
    if (blogs.length === 0) {
        return (
            <div className="row items">
                <div className="col-12 text-center">
                    <p>Blogs coming soon...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="row items">
            {blogs.map(blog => (
                <div key={blog.id} className="col-12 col-md-6 col-lg-4 item">
                    {/* Blog Post */}
                    <div className="card blog-item">
                        <div className="image-holder">
                            {/* Card Thumbnail */}
                            <a className="card-thumb" href={blog.link} target="_blank" rel="noopener noreferrer">
                                <picture>
                                    <img
                                    src={transformImageKitUrl(blog.image, {width: 768, height: 1024, crop: true, quality: 80, format: "auto"})}
                                    alt={blog.title}
                                    />
                                </picture>
                            </a>
                            <div className="card-overlay top fade-down">
                                <div className="logo">
                                    <img src="/img/logo-author.png" alt="Logo" width={'55vw'}/>
                                </div>
                                <div className="post-meta d-flex flex-column ms-3">
                                    <span>Posted by</span>
                                    <span className="post-author"><strong>{blog.author}</strong></span>
                                </div>
                            </div>
                        </div>
                        {/* Card Content */}
                        <div className="card-content mt-3">
                            <div className="heading">
                                <div className="post-meta d-flex">
                                    <span className="post-date">
                                        <i className="bi bi-clock me-1"></i>{blog.date}
                                    </span>
                                </div>
                                <h4 className="title my-2">
                                    <a href={blog.link} target="_blank" rel="noopener noreferrer">{blog.title}</a>
                                </h4>
                                <div className="card-terms" >
                                    {blog.categories.map((category, index) => (
                                        <a key={index} className="terms badge" href="/blog" >{category}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogTwo;