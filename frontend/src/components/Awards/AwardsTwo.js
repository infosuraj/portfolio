import React, { useEffect, useState } from "react";
import axios from "axios";

const AwardsTwo = () => {
    const [awardsData, setAwardsData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null); // Add an error state

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        axios
            .get(`${baseUrl}/awards`)
            .then((response) => {
                setAwardsData(response.data.reverse()); // Assuming response.data is an array of award objects
                setLoading(false); // Set loading to false on success
            })
            .catch((err) => {
                console.error("Error fetching awards:", err);
                setError("Failed to load awards. Please try again later."); // Set an error message
                setLoading(false); // Set loading to false on error
            });
    }, []);

    // Display error message if an error occurred
    if (error) {
        return <div className="text-danger p-3">{error}</div>; // Added some basic styling
    }

    // Display loading message while data is being fetched
    if (loading) {
        return <div className="p-3">Loading awards...</div>; // Improved loading message
    }

    // If there's no data and not loading and no error, it means no awards were found
    if (!awardsData || awardsData.length === 0) {
        return <div className="p-3">No awards to display at this time.</div>;
    }

    return (
        <div className="row justify-content-between">
            <div className="col-12 col-lg-3">
                {/* Intro */}
                <div className="intro">
                    <h3 className="title">Recognized & Certified</h3>
                </div>
            </div>
            <div className="col-12 col-lg-8">
                <div className="row items">
                    {awardsData.map((award, index) => (
                        <div className="col-12 col-md-6 item" key={award.id || index}> {/* Use a unique ID from award.id or fallback to index */}
                            <div className="content">
                                <a className="logo" href={award.link} target="_blank" rel="noopener noreferrer"> {/* Added target and rel for external links */}
                                    <img src={award.image} alt={award.title || `Award ${index + 1}`}  style={{width: '70px'}} /> {/* Use award.title for alt text, fallback to generic */}
                                </a>
                                <h6>{award.title}</h6>
                                <p>{award.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AwardsTwo;