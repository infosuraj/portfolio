import React, { useState, useEffect } from "react";
import { DeleteButton, AddButton } from "../../components/Miscellaneous/ManualButtons";
import { transformImageKitUrl } from "../../utils/ImageKitUrlModify";

// Define empty states for clarity and consistency
const emptyFAQ = { question: "", answer: "" };
const emptyBreadcrumb = { title: "", subtitle: "", subheading: "" };
const emptyServiceItem = { title: "", description: "" };
const emptyServiceSection = { title: "", subtitle: "", serviceItem: [] }; // The structure for a single services section
const emptySocial = { Name: "", Link: "", Icon: "" }; // New empty state for social

export const AdminProfile = ({ profile, onSave, onCancel, onImageUpload }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        phone: "",
        email: "",
        address: "",
        profileImage: "",
        logoLight: "",
        logoDark: "",
        banner: "",
        resume: "", // New field for resume PDF
        faqs: [],
        breadcrumb: [],
        services: [], // This will hold an array, typically with one section
        socials: [], // New field for social media links
    });

    const [filesToUpload, setFilesToUpload] = useState({}); // Stores File objects for new uploads (for both images and PDFs)
    const [showPdfOverlay, setShowPdfOverlay] = useState(false);
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || "",
                description: profile.description || "",
                phone: profile.phone || "",
                email: profile.email || "",
                address: profile.address || "",
                profileImage: profile.profileImage || "",
                logoLight: profile.logoLight || "",
                logoDark: profile.logoDark || "",
                banner: profile.banner || "",
                resume: profile.resume || "", // Initialize resume
                // Ensure breadcrumb is an array with at least one item
                breadcrumb:
                    Array.isArray(profile.breadcrumb) && profile.breadcrumb.length > 0
                        ? profile.breadcrumb
                        : [emptyBreadcrumb],
                // Ensure services is an array with at least one service section
                services:
                    Array.isArray(profile.services) && profile.services.length > 0
                        ? profile.services
                        : [emptyServiceSection],
                faqs: Array.isArray(profile.faqs) ? profile.faqs : [],
                socials: Array.isArray(profile.socials) ? profile.socials : [], // Initialize socials
            });
            setFilesToUpload({}); // Clear any previous files to upload when loading a new profile
        } else {
            // Initialize with default empty structures for new profiles
            setFormData({
                name: "",
                description: "",
                phone: "",
                email: "",
                address: "",
                profileImage: "",
                logoLight: "",
                logoDark: "",
                banner: "",
                resume: "", // Initialize empty for new profiles
                breadcrumb: [emptyBreadcrumb], // Always start with one empty breadcrumb
                services: [emptyServiceSection], // Always start with one empty service section
                faqs: [],
                socials: [], // Initialize empty for new profiles
            });
            setFilesToUpload({}); // Also clear for new profiles
        }
    }, [profile]);

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, field, type, index = null) => {
        const file = e.target.files[0];
        if (!file) return;

        const maxSize = type === "image" ? 10 * 1024 * 1024 : 20 * 1024 * 1024; // 10MB for images, 20MB for PDFs
        if (file.size > maxSize) {
            alert(`File size must be below ${maxSize / (1024 * 1024)}MB.`);
            return;
        }

        const fileKey = index !== null ? `${field}-${index}` : field;

        // Store the file object for later upload
        setFilesToUpload((prev) => ({ ...prev, [fileKey]: file }));
        // Create a temporary URL for immediate preview
        const previewUrl = URL.createObjectURL(file);

        setFormData((prev) => {
            if (index !== null) {
                // This logic is for social icons
                const updatedArray = [...prev[field]];
                updatedArray[index] = { ...updatedArray[index], Icon: previewUrl };
                return { ...prev, [field]: updatedArray };
            }
            // This logic is for direct profile images/resume
            return { ...prev, [field]: previewUrl };
        });
    };

    const handleFAQChange = (index, field, value) => {
        const updatedFAQs = [...formData.faqs];
        updatedFAQs[index][field] = value;
        setFormData((prev) => ({ ...prev, faqs: updatedFAQs }));
    };

    const addFAQ = () => {
        setFormData((prev) => ({ ...prev, faqs: [...prev.faqs, { ...emptyFAQ }] }));
    };

    const removeFAQ = (index) => {
        const updatedFAQs = formData.faqs.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, faqs: updatedFAQs }));
    };

    const handleBreadcrumbChange = (index, field, value) => {
        const updatedBreadcrumb = [...formData.breadcrumb];
        if (!updatedBreadcrumb[index]) {
            updatedBreadcrumb[index] = { ...emptyBreadcrumb };
        }
        updatedBreadcrumb[index][field] = value;
        setFormData((prev) => ({ ...prev, breadcrumb: updatedBreadcrumb }));
    };

    const handleServiceSectionDetailsChange = (field, value) => {
        const updatedServices = [...formData.services];
        if (!updatedServices[0]) {
            updatedServices[0] = { ...emptyServiceSection };
        }
        updatedServices[0][field] = value;
        setFormData((prev) => ({ ...prev, services: updatedServices }));
    };

    const handleServiceItemChange = (itemIndex, field, value) => {
        const updatedServices = [...formData.services];
        if (!updatedServices[0]) {
            updatedServices[0] = { ...emptyServiceSection };
        }
        const updatedServiceItems = [...updatedServices[0].serviceItem];

        if (!updatedServiceItems[itemIndex]) {
            updatedServiceItems[itemIndex] = { ...emptyServiceItem };
        }
        updatedServiceItems[itemIndex][field] = value;
        updatedServices[0].serviceItem = updatedServiceItems;
        setFormData((prev) => ({
            ...prev,
            services: updatedServices,
        }));
    };

    const addServiceItem = () => {
        const updatedServices = [...formData.services];
        if (!updatedServices[0]) {
            updatedServices[0] = { ...emptyServiceSection };
        }
        updatedServices[0].serviceItem.push({ ...emptyServiceItem });
        setFormData((prev) => ({
            ...prev,
            services: updatedServices,
        }));
    };

    const removeServiceItem = (itemIndex) => {
        const updatedServices = [...formData.services];
        if (!updatedServices[0] || !updatedServices[0].serviceItem) return;

        const updatedServiceItems = updatedServices[0].serviceItem.filter(
            (_, i) => i !== itemIndex
        );
        updatedServices[0].serviceItem = updatedServiceItems;
        setFormData((prev) => ({
            ...prev,
            services: updatedServices,
        }));
    };

    // Socials Handlers
    const handleSocialChange = (index, field, value) => {
        const updatedSocials = [...formData.socials];
        updatedSocials[index][field] = value;
        setFormData((prev) => ({ ...prev, socials: updatedSocials }));
    };

    const addSocial = () => {
        setFormData((prev) => ({ ...prev, socials: [...prev.socials, { ...emptySocial }] }));
    };

    const removeSocial = (index) => {
        const updatedSocials = formData.socials.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, socials: updatedSocials }));
        // Also remove the corresponding file from filesToUpload if it was newly added
        setFilesToUpload((prev) => {
            const newFiles = { ...prev };
            const fileKey = `socials-${index}`; // Correct fileKey for social icons
            if (newFiles[fileKey]) {
                // If it was a blob URL, revoke it before deleting
                if (formData.socials[index]?.Icon?.startsWith("blob:")) {
                    URL.revokeObjectURL(formData.socials[index].Icon);
                }
                delete newFiles[fileKey];
            }
            return newFiles;
        });
    };

    const openPdfPreview = (url) => {
        setPdfPreviewUrl(url);
        setShowPdfOverlay(true);
    };

    const closePdfPreview = () => {
        setPdfPreviewUrl("");
        setShowPdfOverlay(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare image and PDF fields for upload
        const fieldsToUpload = [
            "profileImage",
            "logoLight",
            "logoDark",
            "banner",
            "resume",
        ];

        // Upload main images and resume
        const uploadedUrls = await Promise.all(
            fieldsToUpload.map(async (field) => {
                const file = filesToUpload[field];
                if (file) {
                    const url = await onImageUpload(file, "profile"); // Assuming 'profile' is a folder name or category
                    if (!url) {
                        alert(`Failed to upload ${field}. Please try again.`);
                        return formData[field]; // Keep the old URL or current preview if upload fails
                    }
                    return url;
                }
                return formData[field]; // Keep existing URL if no new file selected
            })
        );

        // Handle social icons upload separately
        const updatedSocials = await Promise.all(
            formData.socials.map(async (social, index) => {
                const fileKey = `socials-${index}`; // Correct fileKey for social icons
                const file = filesToUpload[fileKey];

                let newIconUrl = social.Icon; // Default to existing icon URL

                if (file) {
                    const url = await onImageUpload(file, "social-icons"); // Assuming "social-icons" is a folder for these
                    if (!url) {
                        alert(`Failed to upload icon for ${social.Name}. Please try again.`);
                    } else {
                        newIconUrl = url;
                    }
                }
                return { ...social, Icon: newIconUrl };
            })
        );

        const updatedProfile = {
            ...formData,
            profileImage: uploadedUrls[0],
            logoLight: uploadedUrls[1],
            logoDark: uploadedUrls[2],
            banner: uploadedUrls[3],
            resume: uploadedUrls[4],
            socials: updatedSocials, // Assign updated social data with uploaded URLs
        };

        const success = await onSave(updatedProfile);
        if (success) {
            onCancel();
            // Clean up blob URLs after successful save
            // Iterate through all files in filesToUpload and revoke their URLs
            Object.keys(filesToUpload).forEach((key) => {
                const file = filesToUpload[key];
                if (file instanceof File) {
                    // Check if the original URL in formData (or updatedSocials for icons) was a blob URL
                    let urlToRevoke = null;
                    if (key.startsWith("socials-")) {
                        const index = parseInt(key.split('-')[1]);
                        if (formData.socials[index]?.Icon?.startsWith("blob:")) {
                             urlToRevoke = formData.socials[index].Icon;
                        }
                    } else if (formData[key] && formData[key].startsWith("blob:")) {
                        urlToRevoke = formData[key];
                    }

                    if (urlToRevoke) {
                        URL.revokeObjectURL(urlToRevoke);
                    }
                }
            });
            setFilesToUpload({}); // Clear files staged for upload
        }
    };

    const currentServiceSection = formData.services[0] || emptyServiceSection;

    return (
        <div className="admin_card">
            <h2 className="admin_card-title">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="admin_form">
                <div className="admin_form-group">
                    <label>
                        Name <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleTextChange}
                        required
                    />
                </div>
                <div className="admin_form-group admin_form-full-width">
                    <label>
                        Description <span className="required">*</span>
                    </label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleTextChange}
                        required
                    />
                </div>
                <div className="admin_form-group">
                    <label htmlFor="phoneNumber">
                        Phone Number <span className="required">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phone"
                        value={formData.phone}
                        onChange={handleTextChange}
                        placeholder="e.g., +1 (555) 123-4567"
                        pattern="^\+?\d{1,3}[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
                        title="Please enter a valid phone number (e.g., +1 555 123 4567)"
                        required
                    />
                </div>

                <div className="admin_form-group">
                    <label htmlFor="emailAddress">
                        Email Address <span className="required">*</span>
                    </label>
                    <input
                        type="email"
                        id="emailAddress"
                        name="email"
                        value={formData.email}
                        onChange={handleTextChange}
                        placeholder="e.g., john.doe@example.com"
                        required
                    />
                </div>

                <div className="admin_form-group admin_form-full-width">
                    <label htmlFor="fullAddress">
                        Street Address & Details <span className="required">*</span>
                    </label>
                    <textarea
                        id="fullAddress"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleTextChange}
                        placeholder="Enter your full street address, including apartment or suite number..."
                        required
                    ></textarea>
                </div>

                {/* --- Images Accordion --- */}
                <div className="accordion-item">
                    <h4 className="accordion-header">
                        <button
                            className="accordion-button collapsed custom-btn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseImages"
                        >
                            <span className="button-text">Images</span>
                            <span className="plus-icon"></span>
                        </button>
                    </h4>
                    <div
                        id="collapseImages"
                        className="accordion-collapse collapse admin-image-upload"
                        data-bs-parent="#infosuraj-accordion"
                    >
                        {[
                            "profileImage",
                            "logoLight",
                            "logoDark",
                            "banner",
                        ].map((field) => (
                            <div className="admin_form-group" key={field}>
                                <label>{field.replace(/([A-Z])/g, " $1")}</label>
                                {formData[field] && (
                                    <div className="admin_gallery-preview">
                                        <img
                                            src={
                                                formData[field].startsWith("blob:")
                                                    ? formData[field]
                                                    : transformImageKitUrl(formData[field])
                                            }
                                            alt={field.replace(/([A-Z])/g, " $1")}
                                            className="admin_gallery-item"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    id={`upload-${field}`}
                                    style={{ display: "none" }}
                                    onChange={(e) => handleFileChange(e, field, "image")}
                                />
                                <label
                                    htmlFor={`upload-${field}`}
                                    className="admin_file-upload-wrapper"
                                >
                                    <p>Upload {field.replace(/([A-Z])/g, " $1")}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- PDF Resume Accordion --- */}
                <div className="accordion-item">
                    <h4 className="accordion-header">
                        <button
                            className="accordion-button collapsed custom-btn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseResumePdf"
                        >
                            <span className="button-text">Resume PDF</span>
                            <span className="plus-icon"></span>
                        </button>
                    </h4>
                    <div
                        id="collapseResumePdf"
                        className="accordion-collapse collapse admin-image-upload"
                        data-bs-parent="#infosuraj-accordion"
                    >
                        <div className="admin_form-group">
                            <label>Resume PDF</label>
                            {formData.resume && (
                                <div className="admin_pdf-preview" style={{ display: "flex", flexDirection: 'row', gap: '10px' }}>
                                    <p>Current PDF: </p>
                                    <a
                                        href="/"
                                        onClick={(e) => { e.preventDefault(); openPdfPreview(formData.resume); }}
                                        className="pdf-preview-link"
                                    >
                                        View Resume
                                    </a>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="application/pdf"
                                id="upload-resume" // Changed id to match field name for consistency
                                style={{ display: "none" }}
                                onChange={(e) => handleFileChange(e, "resume", "pdf")}
                            />
                            <label
                                htmlFor="upload-resume" // Changed htmlFor to match new id
                                className="admin_file-upload-wrapper"
                            >
                                <p>Upload Resume PDF</p>
                            </label>
                        </div>
                    </div>
                </div>

                {/* --- Socials Accordion --- */}
                <div className="accordion-item">
                    <h4 className="accordion-header">
                        <button
                            className="accordion-button collapsed custom-btn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSocials"
                        >
                            <span className="button-text">Social Media</span>
                            <span className="plus-icon"></span>
                        </button>
                    </h4>
                    <div
                        id="collapseSocials"
                        className="accordion-collapse collapse admin-image-upload"
                        data-bs-parent="#infosuraj-accordion"
                    >
                        <div className="admin_form-group admin_form-full-width">
                            {formData.socials.map((social, index) => (
                                <div key={index} className="admin_faq-block">
                                    <input
                                        type="text"
                                        placeholder="Social Media Name (e.g., LinkedIn)"
                                        value={social.Name}
                                        onChange={(e) =>
                                            handleSocialChange(index, "Name", e.target.value)
                                        }
                                        required
                                    />
                                    <input
                                        type="url"
                                        placeholder="Social Media Link (e.g., https://linkedin.com/in/yourprofile)"
                                        value={social.Link}
                                        onChange={(e) =>
                                            handleSocialChange(index, "Link", e.target.value)
                                        }
                                        required
                                    />
                                    <label>Icon:</label>
                                    {social.Icon && (
                                        <div className="admin_gallery-preview">
                                            <img
                                                src={
                                                    social.Icon.startsWith("blob:")
                                                        ? social.Icon
                                                        : transformImageKitUrl(social.Icon)
                                                }
                                                alt={`${social.Name} Icon`}
                                                className="admin_gallery-item"
                                                style={{ maxWidth: "50px", maxHeight: "50px" }}
                                            />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id={`upload-socials-${index}`} // Corrected id to use `socials-${index}`
                                        style={{ display: "none" }}
                                        onChange={(e) => handleFileChange(e, "socials", "image", index)} // Pass "socials" as field and index
                                    />
                                    <label
                                        htmlFor={`upload-socials-${index}`} // Corrected htmlFor
                                        className="admin_file-upload-wrapper"
                                    >
                                        <p>Upload Icon for {social.Name || "Social Link"}</p>
                                    </label>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <DeleteButton onClick={() => removeSocial(index)} />
                                    </div>
                                </div>
                            ))}
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <AddButton onClick={addSocial} buttonText="Add Social Link" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Breadcrumb Accordion --- */}
                <div className="accordion-item">
                    <h4 className="accordion-header">
                        <button
                            className="accordion-button collapsed custom-btn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseBreadcrumb"
                        >
                            <span className="button-text">Breadcrumb</span>
                            <span className="plus-icon"></span>
                        </button>
                    </h4>
                    <div
                        id="collapseBreadcrumb"
                        className="accordion-collapse collapse admin-image-upload"
                        data-bs-parent="#infosuraj-accordion"
                    >
                        <div className="admin_form-group admin_form-full-width">
                            <div className="admin_faq-block">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formData.breadcrumb?.[0]?.title || ""}
                                    onChange={(e) =>
                                        handleBreadcrumbChange(0, "title", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Subtitle"
                                    value={formData.breadcrumb?.[0]?.subtitle || ""}
                                    onChange={(e) =>
                                        handleBreadcrumbChange(0, "subtitle", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Subheading"
                                    value={formData.breadcrumb?.[0]?.subheading || ""}
                                    onChange={(e) =>
                                        handleBreadcrumbChange(0, "subheading", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Services Accordion --- */}
                <div className="accordion-item">
                    <h4 className="accordion-header">
                        <button
                            className="accordion-button collapsed custom-btn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseServices"
                        >
                            <span className="button-text">Services</span>{" "}
                            <span className="plus-icon"></span>
                        </button>
                    </h4>
                    <div
                        id="collapseServices"
                        className="accordion-collapse collapse"
                        data-bs-parent="#infosuraj-accordion"
                    >
                        <div className="accordion-body">
                            <h5 className="card-title">Services Section Details</h5>
                            <div className="admin_form-group mb-4">
                                <input
                                    type="text"
                                    placeholder="Section Title (e.g., 'Our Offerings')"
                                    value={currentServiceSection.title || ""}
                                    onChange={(e) =>
                                        handleServiceSectionDetailsChange("title", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Section Subtitle (e.g., 'What we do best')"
                                    value={currentServiceSection.subtitle || ""}
                                    onChange={(e) =>
                                        handleServiceSectionDetailsChange(
                                            "subtitle",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <h6 className="mt-3">Individual Service Items:</h6>
                            {currentServiceSection.serviceItem.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="admin_faq-block mb-2 p-2 border rounded bg-light"
                                >
                                    <h6>Service Item {itemIndex + 1}</h6>
                                    <input
                                        type="text"
                                        placeholder="Service Item Title"
                                        value={item.title || ""}
                                        onChange={(e) =>
                                            handleServiceItemChange(
                                                itemIndex,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <textarea
                                        placeholder="Service Item Description"
                                        value={item.description || ""}
                                        onChange={(e) =>
                                            handleServiceItemChange(
                                                itemIndex,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        rows="3"
                                    ></textarea>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <DeleteButton onClick={() => removeServiceItem(itemIndex)} />
                                    </div>
                                </div>
                            ))}
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <AddButton onClick={addServiceItem} buttonText="Add New Service Item" />
                            </div>

                            {currentServiceSection.serviceItem.length === 0 && (
                                <p className="text-muted">
                                    No service items added yet. Click "Add New Service Item" to
                                    start.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- FAQs Accordion --- */}
                <div className="accordion-item">
                    <h4 className="accordion-header">
                        <button
                            className="accordion-button collapsed custom-btn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFAQs"
                        >
                            <span className="button-text">FAQs</span>
                            <span className="plus-icon"></span>
                        </button>
                    </h4>
                    <div
                        id="collapseFAQs"
                        className="accordion-collapse collapse admin-image-upload"
                        data-bs-parent="#infosuraj-accordion"
                    >
                        <div className="admin_form-group admin_form-full-width">
                            {formData.faqs.map((faq, index) => (
                                <div key={index} className="admin_faq-block">
                                    <input
                                        type="text"
                                        placeholder="Question"
                                        value={faq.question}
                                        onChange={(e) =>
                                            handleFAQChange(index, "question", e.target.value)
                                        }
                                        required
                                    />
                                    <textarea
                                        placeholder="Answer"
                                        value={faq.answer}
                                        onChange={(e) =>
                                            handleFAQChange(index, "answer", e.target.value)
                                        }
                                        required
                                    />
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <DeleteButton onClick={() => removeFAQ(index)} />
                                    </div>
                                </div>
                            ))}
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <AddButton onClick={addFAQ} buttonText="Add FAQ" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Form Actions --- */}
                <div className="admin_form-actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="admin_button admin_button-secondary"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="admin_button admin_button-success">
                        Save Profile
                    </button>
                </div>
            </form>

            {/* PDF Overlay */}
            {showPdfOverlay && (
                <div className="pdf-overlay" onClick={closePdfPreview}>
                    <div className="pdf-overlay-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-pdf-overlay" onClick={closePdfPreview}>
                            &times;
                        </button>
                        <iframe
                            src={pdfPreviewUrl}
                            title="PDF Preview"
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};