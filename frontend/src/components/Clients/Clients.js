import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clients = () => {
    const [clientLogos, setClientLogos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        axios
            .get(`${baseUrl}/clients`)
            .then((response) => {
                setClientLogos(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching Clients data:", err);
                setError("Failed to load client logos.");
                setLoading(false);
            });
    }, []);

    // --- Conditional Rendering to turn off the section ---
    if (loading) {
        return <div className="text-center p-3">Loading clients...</div>;
    }

    if (error) {
        return <div className="text-danger p-3">{error}</div>;
    }

    // If no data, return null to hide the section completely
    if (!clientLogos || clientLogos.length === 0) {
        return null;
    }

    // --- If we have data, render the marquee ---
    return (
        <div className="marquee">
            <ul className="list-unstyled">
                {/* Render original items */}
                {clientLogos.map((client, index) => (
                    <li key={client._id || index} className="item">
                        <a
                            href={client.link || "/about"}
                            className="marquee-item rounded"
                            target={client.link ? "_blank" : "_self"}
                            rel={client.link ? "noopener noreferrer" : ""}
                        >
                            <div className="marquee-content">
                                <img
                                    src={client.clientImage}
                                    alt={client.name || `Brand ${index + 1}`}
                                />
                            </div>
                        </a>
                    </li>
                ))}
                {/* *** CRUCIAL FIX FOR SEAMLESS LOOP ***
                  Duplicate the items here. The CSS animation "translateX(-50%)"
                  relies on having a copy of the content immediately following the original.
                */}
                {clientLogos.map((client, index) => (
                    <li key={`duplicate-${client._id || index}`} className="item">
                        <a
                            href={client.link || "/about"}
                            className="marquee-item rounded"
                            target={client.link ? "_blank" : "_self"}
                            rel={client.link ? "noopener noreferrer" : ""}
                        >
                            <div className="marquee-content">
                                <img
                                    src={client.clientImage}
                                    alt={client.name || `Brand ${index + 1}`}
                                />
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Clients;