import React, { useEffect, useState } from "react";
import axios from "axios";

const AwardsOne = () => {
    const [awardsData, setAwardsData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null); // Add an error state

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        axios
            .get(`${baseUrl}/awards?limit=5`)
            .then((response) => {
                setAwardsData(response.data); // Assuming response.data is an array of award objects
                setLoading(false); // Set loading to false on success
            })
            .catch((err) => {
                console.error("Error fetching awards:", err);
                setError("Failed to load awards. Please try again later."); // Set an error message
                setLoading(false); // Set loading to false on error
            });
    }, []);

    if (!awardsData || awardsData.length === 0) {
        return <div className="p-3">No awards to display at this time.</div>;
    }

    return (
        <section className="awards sticky primary-bg">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-3">
                        {/* Intro Section - The title "Awards & Recognition" is now static */}
                        <div className="intro">
                            <h3 className="title">Recognized & Certified</h3>
                        </div>
                    </div>

                    <div className="col-12 col-lg-8">
                        <ul className="list-group list-group-flush">
                            {loading ? (
                                // Display loading message while data is being fetched
                                <li className="list-group-item">
                                    <div className="content">Loading awards...</div>
                                </li>
                            ) : error ? (
                                // Display error message if the API call fails
                                <li className="list-group-item">
                                    <div className="content text-danger">{error}</div>
                                </li>
                            ) : awardsData.length > 0 ? (
                                // Render awards if data is available
                                awardsData.map((award) => (
                                    // Using award._id as key for unique identification
                                    <li key={award._id} className="list-group-item">
                                        <div className="content">
                                            <a
                                            href={award.link}
                                            target="_blank" // Opens link in a new tab
                                            rel="noopener noreferrer" // Security best practice for target="_blank"
                                        >
                                            <h4 className="title mt-0 mb-3">{award.title}</h4>
                                            </a>
                                            <span className="tags mt-3 mt-md-0">
                                                {award.year} - {award.award}
                                            </span>
                                            
                                        </div>
                                        {/* Award Button - Restored to always render with award.link */}
                                        {/* If award.link is empty or null, the href will be empty, which might not be desirable.
                                            Consider adding a default link or making it conditional if an empty href causes issues. */}
                                        <a
                                            className="award-btn rounded-pill"
                                            href={award.link}
                                            target="_blank" // Opens link in a new tab
                                            rel="noopener noreferrer" // Security best practice for target="_blank"
                                        >
                                            <i className="icon rotate bi bi-arrow-right-short m-0"></i>
                                        </a>
                                    </li>
                                ))
                            ) : (
                                // Display message if no awards are found after loading
                                <li className="list-group-item">
                                    <div className="content">No awards found.</div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AwardsOne;