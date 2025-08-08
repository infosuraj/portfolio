import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Don't forget to import axios

const Experiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        axios
            .get(`${baseUrl}/experiences`)
            .then((response) => {
                const processedExperiences = response.data.map((experience, index) => {
                    return {
                        ...experience,
                        date: `${experience.startDate} - ${experience.endDate}`,
                        count: `0${index + 1}.` // Starts count from 1
                    };
                });
                setExperiences(processedExperiences);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching Experiences data:", err);
                setError("Failed to load Experiences.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center p-3">Loading experiences...</div>;
    }

    if (error) {
        return <div className="text-danger p-3">{error}</div>;
    }

    if (!experiences || experiences.length === 0) {
        return null;
    }

    return (
        <section className="experiences sticky primary-bg">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-3">
                        {/* Intro */}
                        <div className="intro">
                            <h3 className="title">Experiences</h3>
                        </div>
                    </div>

                    <div className="col-12 col-lg-8">
                        <div className="row items">
                            {experiences.map((experience) => (
                                // FIX 6: Use experience._id for key
                                <div key={experience._id} className="col-12 col-md-6 item">
                                    <div className="content">
                                        <span className="count">{experience.count}</span>
                                        <h4 className="title mt-0 mb-3">{experience.title}</h4>
                                        <h6 className="position my-3">{experience.position}</h6>
                                        {/* Using the combined 'date' field from processedExperiences */}
                                        <span className="badge small">{experience.date}</span>
                                        <p>{experience.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experiences;