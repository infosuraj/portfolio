import React, { useState, useEffect } from 'react';
import { AddButton, DeleteButton, EditButton } from '../../components/Miscellaneous/ManualButtons';

// --- 1. Update defaultAffiliate to include 'logo' ---
const defaultAffiliate = {
    logo: '', // New logo field
    title: '',
    description: '',
    image: '',
    link: '',
    categories: []
};

export const AffiliatesTab = ({ affiliates, onAddNew, onEdit, onDelete }) => (
    <div className="admin_card">
        <div className="admin_card-header">
            <h2 className="admin_card-title">Affiliates</h2>
            <button onClick={onAddNew} className="admin_button admin_button-primary">
                Add New Affiliate
            </button>
        </div>
        <div className="admin_table-wrapper">
            <table className="admin_table">
                <thead>
                    <tr>
                        {/* --- 2. Add Logo column to the table --- */}
                        <th>Logo</th>
                        <th>Title</th>
                        <th>Link</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {affiliates && affiliates.length > 0 ? (
                        affiliates.map((affiliate) => (
                            <tr key={affiliate._id}>
                                {/* --- Display Logo in table --- */}
                                <td>
                                    {affiliate.logo ? (
                                        <img
                                            src={affiliate.logo}
                                            alt={`${affiliate.title} logo`}
                                            style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px' }}
                                        />
                                    ) : (
                                        <span>No Logo</span>
                                    )}
                                </td>
                                <td>{affiliate.title}</td>
                                <td>
                                    <a href={affiliate.link} target="_blank" rel="noopener noreferrer">
                                        {affiliate.link}
                                    </a>
                                </td>
                                <td className="admin_table-actions">
                                    <EditButton onClick={() => onEdit(affiliate)} />
                                    <DeleteButton onClick={() => onDelete(affiliate._id)} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4" style={{ textAlign: 'center' }}>No affiliates added yet.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export const AffiliateForm = ({ affiliate, onSave, onCancel, onImageUpload }) => {
    const [formData, setFormData] = useState(defaultAffiliate);

    useEffect(() => {
        setFormData(affiliate || defaultAffiliate);
    }, [affiliate]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCategoryChange = (index, value) => {
        const updated = [...formData.categories];
        updated[index] = value;
        setFormData((prev) => ({ ...prev, categories: updated }));
    };

    const addCategory = () => {
        setFormData((prev) => ({
            ...prev,
            categories: [...prev.categories, '']
        }));
    };

    const removeCategory = (index) => {
        const updated = formData.categories.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, categories: updated }));
    };

    // --- New handler for logo upload ---
    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        // Assuming onImageUpload can handle 'logos' folder or similar
        const uploadedUrl = await onImageUpload(file, 'affiliates'); // Use a specific folder for logos
        if (uploadedUrl) {
            setFormData((prev) => ({ ...prev, logo: uploadedUrl }));
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const uploadedUrl = await onImageUpload(file, 'affiliates/affiliate_image');
        if (uploadedUrl) {
            setFormData((prev) => ({ ...prev, image: uploadedUrl }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await onSave(formData, affiliate?._id);
        if (success) onCancel();
    };

    return (
        <div className="admin_card">
            <h2 className="admin_card-title">{affiliate ? 'Edit Affiliate' : 'Add New Affiliate'}</h2>
            <form onSubmit={handleSubmit} className="admin_form">
                {/* --- Input for Logo Upload --- */}
                <div className="admin_form-group">
                    <label>Upload Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="upload-affiliate-logo" // Unique ID
                        style={{ display: 'none' }}
                        onChange={handleLogoChange} // New handler
                    />
                    <label htmlFor="upload-affiliate-logo" className="admin_file-upload-wrapper">
                        <span className="upload-btn">📤 Upload Logo</span>
                    </label>
                    {formData.logo && (
                        <div className='admin_gallery-preview' style={{ marginTop: '0.5rem' }}>
                            <img src={formData.logo} alt="logo preview" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                        </div>
                    )}
                </div>

                <input type="text" placeholder="Title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
                <input type="text" placeholder="Description" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} />
                <input type="text" placeholder="Link" value={formData.link} onChange={(e) => handleChange('link', e.target.value)} />

                <div className="admin_form-group">
                    <label>Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="upload-affiliate-image"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="upload-affiliate-image" className="admin_file-upload-wrapper">
                        <span className="upload-btn">📤 Upload Image</span>
                    </label>
                    {formData.image && (
                        <div className='admin_gallery-preview' style={{ marginTop: '0.5rem' }}>
                            <img src={formData.image} alt="preview" style={{ width: '100px' }} />
                        </div>
                    )}
                </div>

                <div className="admin_form-group admin_form-full-width">
                    <label>Categories</label>
                    {formData.categories.map((cat, idx) => (
                        <div key={idx} className="admin_skill-block">
                            <input
                                type="text"
                                placeholder={`Category ${idx + 1}`}
                                value={cat}
                                onChange={(e) => handleCategoryChange(idx, e.target.value)}
                                style={{ width: '30%' }}
                            />
                            <div style={{ marginLeft: '13%', marginTop: '10px' }}>
                                <DeleteButton onClick={() => removeCategory(idx)} />
                            </div>
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                        <AddButton onClick={addCategory} buttonText="Add Category" />
                    </div>
                    {formData.categories.length === 0 && (
                        <p className="text-muted">No Categories Added!</p>
                    )}
                </div>

                <div className="admin_form-actions">
                    <button type="button" onClick={onCancel} className="admin_button admin_button-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="admin_button admin_button-success">
                        Save Affiliate
                    </button>
                </div>
            </form>
        </div>
    );
};