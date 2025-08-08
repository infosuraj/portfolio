import React, { useState } from 'react';
import './Affiliate.css'; // Import the CSS
import { transformImageKitUrl } from '../../utils/ImageKitUrlModify';

const AffiliateCard = ({ affiliate, onQuickView }) => { // Added onQuickView prop
    const [showFullDescription, setShowFullDescription] = useState(false);
    const DESCRIPTION_PREVIEW_LENGTH = 150; // Show first 150 characters

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const isDescriptionLong = affiliate.description.length > DESCRIPTION_PREVIEW_LENGTH;
    const displayedDescription = showFullDescription
        ? affiliate.description
        : `${affiliate.description.substring(0, DESCRIPTION_PREVIEW_LENGTH)}${isDescriptionLong ? '...' : ''}`;

    // Function to handle card click (navigates to affiliate.link)
    const handleCardClick = () => {
        window.open(affiliate.link, '_blank', 'noopener noreferrer');
    };

    return (
        <article className="affiliate-card">
            <div className="rounded-lg affiliate-image-container">
                <img src={transformImageKitUrl(affiliate.image, {width: 800, crop: true, quality: 80, format: "auto"})} alt={affiliate.title} className="affiliate-image" onClick={handleCardClick}/>
            </div>
            <div className="affiliate-info">
                <div className="affiliate-title-link-wrapper">
                    <h2 className="affiliate-title" onClick={handleCardClick}>{affiliate.title}</h2>
                    {/* NEW: Quick View Button */}
                    {/* This button prevents the card's click event and instead opens the modal */}
                    <button
                        className="quick-view-btn"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the parent card click
                            onQuickView(affiliate); // Trigger the quick view modal
                        }}
                        aria-label={`Quick view details for ${affiliate.title}`}
                    >
                        {/* Eye Icon SVG */}
                        <svg style={{ color: "black" }} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx="10" cy="10" r="7"></circle>
    <line x1="21" y1="21" x2="15" y2="15"></line>
</svg>
                    </button>
                    {/* Original direct link icon */}
                    <a href={affiliate.link} target="_blank" rel="noopener noreferrer" className="affiliate-link-icon"
                        onClick={(e) => { e.stopPropagation(); /* Prevent card click when icon is clicked */ }}>
                        <svg style={{ color: "black" }} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" color="black" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor">
                            <line y2="12" x2="19" y1="12" x1="5"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
                <p className="affiliate-description">
                    {displayedDescription}
                </p>
                {isDescriptionLong && (
                    <button className="show-more-btn" onClick={(e) => { e.stopPropagation(); toggleDescription(); }}>
                        {showFullDescription ? 'Show Less' : 'Show More'}
                    </button>
                )}
                <div className="affiliate-categories">
                    {affiliate.categories && affiliate.categories.map((cat, index) => (
                        <span key={index}
                            className="project-type"
                            style={cat === "Analytics" ? { backgroundColor: 'rgba(165, 96, 247, 0.43)', color: 'rgb(85, 27, 177)' } : {}}
                        >
                            {cat}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default AffiliateCard;