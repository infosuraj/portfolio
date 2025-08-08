import React from 'react';
import './Affiliate.css'; // Use the same CSS for consistent styling
import MagneticButton from '../Miscellaneous/MagneticButton';
import { transformImageKitUrl } from '../../utils/ImageKitUrlModify'; // Import the utility function

const AffiliateQuickViewModal = ({ affiliate, onClose }) => {
    if (!affiliate) return null; // Don't render if no affiliate data

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* NEW: Modal Header for Circles and Close Button */}
                <div className="modal-header">
                    <a
                        href={affiliate.link} // Pass the actual affiliate link
                        target="_blank"        // Tells the browser to open in a new tab/window
                        rel="noopener noreferrer"
                        >
                    <img
                        src={transformImageKitUrl(affiliate.logo, {width: 1200, crop: true, quality: 80, format: "auto"})}
                        alt={affiliate.title}
                        className="logo-image"
                    />
                    </a>
                    <button className="modal-close-btn" onClick={onClose}>
                        &times; {/* HTML entity for a multiplication sign (looks like an 'X') */}
                    </button>
                </div>

                <div className="modal-image-container">
                    <img
                        src={transformImageKitUrl(affiliate.image, {width: 1200, crop: true, quality: 80, format: "auto"})}
                        alt={affiliate.title}
                        className="modal-image"
                    />
                </div>
                <div className="modal-info">
                    <h3 className="modal-title">{affiliate.title}</h3>
                    <p className="modal-description" style={{margin: '5px 0'}}>{affiliate.description}</p>
                    <div className="modal-categories">
                        {affiliate.categories && affiliate.categories.map((cat, index) => (
                            <span key={index}
                                className="project-type" // Reusing the project-type class
                                style={cat === "Analytics" ? { backgroundColor: 'rgba(165, 96, 247, 0.43)', color: 'rgb(85, 27, 177)' } : {}}
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                    <MagneticButton
                        href={affiliate.link} // Pass the actual affiliate link
                        target="_blank"        // Tells the browser to open in a new tab/window
                        rel="noopener noreferrer" // Security best practice for target="_blank" links
                    >
                        Grab Now!
                    </MagneticButton>
                </div>
            </div>
        </div>
    );
};

export default AffiliateQuickViewModal;