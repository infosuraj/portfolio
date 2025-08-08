import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AffiliateCard from './AffiliateCard';
import AffiliateQuickViewModal from './AffiliateQuickViewModal'; // Import the new modal component
import './Affiliate.css'; // Import the CSS

const AffiliateSection = () => {
    const [affiliates, setAffiliates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // NEW: State for the Quick View Modal
    const [showQuickViewModal, setShowQuickViewModal] = useState(false);
    const [selectedAffiliate, setSelectedAffiliate] = useState(null);

    // Memoized function to fetch affiliates
    const fetchAffiliates = useCallback(async () => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${baseUrl}/affiliates`);
            setAffiliates(response.data.reverse());
        } catch (err) {
            console.error('Error fetching affiliate programs:', err);
            setError('Failed to load affiliate programs. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Function to handle opening the quick view modal
    const handleQuickView = (affiliate) => {
        setSelectedAffiliate(affiliate);
        setShowQuickViewModal(true);
    };

    // Function to handle closing the quick view modal
    const closeQuickViewModal = () => {
        setShowQuickViewModal(false);
        setSelectedAffiliate(null); // Clear selected affiliate when closing
    };

    // Fetch affiliates on component mount
    useEffect(() => {
        fetchAffiliates();
    }, [fetchAffiliates]);

    return (
        <main id="affiliate-main-content">
            <section id="affiliate-list">
                {loading && <div id="loading-spinner">Loading affiliate programs...</div>}
                {error && <div className="error-message">{error}</div>}
                {!loading && !error && affiliates.length === 0 && (
                    <div id="no-affiliates">No affiliate programs found.</div>
                )}
                {!loading && !error && affiliates.length > 0 && (
                    affiliates.map((affiliate) => (
                        <AffiliateCard
                            key={affiliate._id}
                            affiliate={affiliate}
                            onQuickView={handleQuickView} // Pass the quick view handler
                        />
                    ))
                )}
            </section>

            {/* NEW: Render the Quick View Modal conditionally */}
            {showQuickViewModal && (
                <AffiliateQuickViewModal
                    affiliate={selectedAffiliate}
                    onClose={closeQuickViewModal}
                />
            )}
        </main>
    );
};

export default AffiliateSection;