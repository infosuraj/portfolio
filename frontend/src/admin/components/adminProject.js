import React, { useState, useEffect } from "react";
import {
  EditButton,
  DeleteButton,
} from "../../components/Miscellaneous/ManualButtons";
import { transformImageKitUrl } from "../../utils/ImageKitUrlModify";

// ProjectsTab component (no changes needed here for thumbnails directly)
export const ProjectsTab = ({ projects, onEdit, onDelete, onAddNew }) => (
  <div className="admin_card">
    <div className="admin_card-header">
      <h2 className="admin_card-title">Projects</h2>
      <button onClick={onAddNew} className="admin_button admin_button-primary">
        Add New Project
      </button>
    </div>
    <div className="admin_table-wrapper">
      <table className="admin_table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Categories</th>
            <th>Date</th>
            <th>Selected</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.length > 0 ? (
            projects.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>
                  {Array.isArray(p.categories)
                    ? p.categories.join(", ")
                    : p.categories}
                </td>
                <td>{p.date}</td>
                <td>{p.selected ? "Yes" : "No"}</td>
                <td className="admin_table-actions">
                  <EditButton onClick={() => onEdit(p)} />
                  <DeleteButton onClick={() => onDelete(p._id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No projects yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// --- START: ProjectForm Component Updates ---

const initialFormState = {
  title: "",
  date: "",
  categories: [],
  description: "",
  task: "",
  role: "",
  client: "",
  categoryYear: "",
  liveSite: "#",
  gallery: [],
  selected: false,
  // --- ADDED: Thumbnail initial state ---
  thumbnail: {
    smallScreen: "",
    largeScreen: "",
  },
  // --- END ADDED ---
};

const categoryOptions = [
  "web-development",
  "art",
  "photography",
  "digital-marketing",
];

export const ProjectForm = ({ project, onSave, onCancel, onImageUpload }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [filesToUpload, setFilesToUpload] = useState([]);
  // --- ADDED: State for thumbnail files ---
  const [smallScreenThumbnailFile, setSmallScreenThumbnailFile] = useState(null);
  const [largeScreenThumbnailFile, setLargeScreenThumbnailFile] = useState(null);
  // --- END ADDED ---

  useEffect(() => {
    if (project) {
      setFormData({
        ...initialFormState,
        ...project,
        categories: Array.isArray(project.categories) ? project.categories : [],
        role: Array.isArray(project.role)
          ? project.role.join(", ")
          : project.role || "",
        gallery: project.gallery || [],
        selected: project.selected || false,
        // --- ADDED: Populate thumbnail from existing project ---
        thumbnail: project.thumbnail || { smallScreen: "", largeScreen: "" },
        // --- END ADDED ---
      });
    } else {
      setFormData(initialFormState);
    }
    setFilesToUpload([]);
    // --- ADDED: Clear thumbnail files on project change ---
    setSmallScreenThumbnailFile(null);
    setLargeScreenThumbnailFile(null);
    // --- END ADDED ---
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // --- ADDED: Handle nested thumbnail fields ---
    if (name.startsWith("thumbnail.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        thumbnail: {
          ...prev.thumbnail,
          [field]: value,
        },
      }));
    }
    // --- END ADDED ---
    else if (type === "checkbox") {
      if (name === "categories") {
        setFormData((prev) => {
          const newCategories = checked
            ? [...prev.categories, value]
            : prev.categories.filter((category) => category !== value);
          return { ...prev, categories: newCategories };
        });
      } else if (name === "selected") {
        setFormData((prev) => ({ ...prev, selected: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- ADDED: New handler for thumbnail file changes ---
  const handleThumbnailFileChange = (e, screenType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (screenType === "smallScreen") {
      setSmallScreenThumbnailFile(file);
      setFormData((prev) => ({
        ...prev,
        thumbnail: {
          ...prev.thumbnail,
          smallScreen: URL.createObjectURL(file), // Show preview
        },
      }));
    } else if (screenType === "largeScreen") {
      setLargeScreenThumbnailFile(file);
      setFormData((prev) => ({
        ...prev,
        thumbnail: {
          ...prev.thumbnail,
          largeScreen: URL.createObjectURL(file), // Show preview
        },
      }));
    }
  };

  const handleRemoveThumbnail = (screenType) => {
    if (screenType === "smallScreen") {
      setSmallScreenThumbnailFile(null);
      setFormData((prev) => ({
        ...prev,
        thumbnail: {
          ...prev.thumbnail,
          smallScreen: "",
        },
      }));
    } else if (screenType === "largeScreen") {
      setLargeScreenThumbnailFile(null);
      setFormData((prev) => ({
        ...prev,
        thumbnail: {
          ...prev.thumbnail,
          largeScreen: "",
        },
      }));
    }
  };
  // --- END ADDED ---

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length === 0) return;

    setFilesToUpload((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), ...newPreviews],
    }));
  };

  const handleRemoveImage = (indexToRemove, urlToRemove) => {
    const updatedGallery = formData.gallery.filter(
      (_, i) => i !== indexToRemove
    );
    setFormData((prev) => ({ ...prev, gallery: updatedGallery }));

    if (urlToRemove.startsWith("blob:")) {
      const blobUrlsInGallery = formData.gallery.filter((url) =>
        url.startsWith("blob:")
      );
      const blobIndex = blobUrlsInGallery.indexOf(urlToRemove);
      if (blobIndex !== -1) {
        setFilesToUpload((prevFiles) =>
          prevFiles.filter((_, i) => i !== blobIndex)
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload main gallery images
    const existingImageUrls = formData.gallery.filter(
      (url) => !url.startsWith("blob:")
    );

    const uploadedGalleryUrls = await Promise.all(
      filesToUpload.map((file) => onImageUpload(file, "projects/gallery")) // Consider a subfolder for gallery
    );
    const newSuccessfulGalleryUrls = uploadedGalleryUrls.filter((url) => url !== null);

    // --- ADDED: Upload thumbnail images ---
    let smallScreenThumbnailUrl = formData.thumbnail.smallScreen;
    if (smallScreenThumbnailFile) {
      const url = await onImageUpload(smallScreenThumbnailFile, "projects/thumbnails"); // Subfolder for thumbnails
      if (url) smallScreenThumbnailUrl = url;
      else console.error("Small screen thumbnail failed to upload.");
    } else if (formData.thumbnail.smallScreen.startsWith("blob:")) {
      // If it was a preview but no file was uploaded (meaning it was removed)
      smallScreenThumbnailUrl = "";
    }

    let largeScreenThumbnailUrl = formData.thumbnail.largeScreen;
    if (largeScreenThumbnailFile) {
      const url = await onImageUpload(largeScreenThumbnailFile, "projects/thumbnails");
      if (url) largeScreenThumbnailUrl = url;
      else console.error("Large screen thumbnail failed to upload.");
    } else if (formData.thumbnail.largeScreen.startsWith("blob:")) {
        // If it was a preview but no file was uploaded (meaning it was removed)
      largeScreenThumbnailUrl = "";
    }
    // --- END ADDED ---

    // Combine all data for saving
    const dataToSave = {
      ...formData,
      gallery: [...existingImageUrls, ...newSuccessfulGalleryUrls],
      role: formData.role
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      // --- ADDED: Include updated thumbnail URLs ---
      thumbnail: {
        smallScreen: smallScreenThumbnailUrl,
        largeScreen: largeScreenThumbnailUrl,
      },
      // --- END ADDED ---
    };

    const projectId = project?._id;

    // Assuming onSave handles the API call to your backend
    const success = await onSave(dataToSave, projectId);
    if (success) {
      onCancel();
    }
  };

  return (
    <div className="admin_card">
      <h2 className="admin_card-title">
        {project ? "Edit Project" : "Add New Project"}
      </h2>
      <form onSubmit={handleSubmit} className="admin_form">
        <div className="admin_form-group">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin_form-group">
          <label htmlFor="date">
            Date <span className="required">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin_form-group admin_form-full-width">
          <label htmlFor="description">
            Description <span className="required">*</span>
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="admin_form-group admin_form-full-width">
          <label htmlFor="task">
            Task <span className="required">*</span>
          </label>
          <textarea
            name="task"
            rows="2"
            value={formData.task}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Categories section */}
        <div className="admin_form-group admin_form-full-width">
          <label>Categories</label>
          <div className="admin_checkbox-grid">
            {categoryOptions.map((category) => (
              <label key={category} className="admin_checkbox-item">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  checked={formData.categories.includes(category)}
                  onChange={handleChange}
                />
                {category
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>
            ))}
          </div>
        </div>
        {/* End Categories section */}

        <div className="admin_form-group">
          <label htmlFor="role">Role (comma-separated)</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g., Lead Designer, Developer"
          />
        </div>
        <div className="admin_form-group">
          <label htmlFor="client">Client</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
          />
        </div>
        <div className="admin_form-group">
          <label htmlFor="categoryYear">
            Category Year <span className="required">*</span>
          </label>
          <input
            type="text"
            name="categoryYear"
            value={formData.categoryYear}
            onChange={handleChange}
            placeholder="e.g., Brand Identity ©2025"
            required
          />
        </div>
        <div className="admin_form-group admin_form-full-width">
          <label htmlFor="liveSite">Live Site URL</label>
          <input
            type="text"
            name="liveSite"
            value={formData.liveSite}
            onChange={handleChange}
          />
        </div>

        {/* New "Selected" Checkbox */}
        <div className="admin_form-group admin_form-inline-checkbox">
          <label className="admin_checkbox-item">Selected Work</label>
          <input
            type="checkbox"
            name="selected"
            checked={formData.selected}
            onChange={handleChange}
          />
        </div>
        {/* End New "Selected" Checkbox */}

        {/* --- ADDED: Thumbnail Upload Fields --- */}
        <div className="admin_form-group admin_form-full-width">
          <label>Project Thumbnails</label>
          <div className="admin_thumbnail-upload-section">
            {/* Small Screen Thumbnail */}
            <div className="admin_thumbnail-upload-box">
              <label htmlFor="smallScreenThumbnail">Mobile Thumbnail</label>
              {formData.thumbnail.smallScreen && (
                <div className="admin_thumbnail-preview">
                  <img
                    src={formData.thumbnail.smallScreen}
                    alt="Small Screen Thumbnail Preview"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveThumbnail("smallScreen")}
                    className="admin_gallery-remove-btn"
                  >
                    ×
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleThumbnailFileChange(e, "smallScreen")}
                id="smallScreenThumbnail"
                style={{ display: "none" }}
              />
              <label
                htmlFor="smallScreenThumbnail"
                className="admin_file-upload-wrapper"
              >
                <p>{formData.thumbnail.smallScreen ? "Change" : "Upload"} Mobile Thumbnail</p>
              </label>
            </div>

            {/* Large Screen Thumbnail */}
            <div className="admin_thumbnail-upload-box">
              <label htmlFor="largeScreenThumbnail">Desktop Thumbnail</label>
              {formData.thumbnail.largeScreen && (
                <div className="admin_thumbnail-preview">
                  <img
                    src={formData.thumbnail.largeScreen}
                    alt="Large Screen Thumbnail Preview"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveThumbnail("largeScreen")}
                    className="admin_gallery-remove-btn"
                  >
                    ×
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleThumbnailFileChange(e, "largeScreen")}
                id="largeScreenThumbnail"
                style={{ display: "none" }}
              />
              <label
                htmlFor="largeScreenThumbnail"
                className="admin_file-upload-wrapper"
              >
                <p>{formData.thumbnail.largeScreen ? "Change" : "Upload"} Desktop Thumbnail</p>
              </label>
            </div>
          </div>
        </div>
        {/* --- END ADDED --- */}


        <div className="admin_form-group admin_form-full-width">
          <label>Project Gallery</label>
          <div className="admin_gallery-preview">
            {formData.gallery &&
              formData.gallery.map((url, index) => (
                <div key={index} className="admin_gallery-item">
                  {(() => {
                    const isVideo = url.endsWith(".mp4") || url.includes("video");
                    let thumbnailImage = '';
                    if (url) {
                      if (isVideo) {
                        thumbnailImage = transformImageKitUrl(url, { width: 800, quality: 80, format: 'auto', isThumbnail: true });
                      } else {
                        // Use the transformImageKitUrl function for images
                        thumbnailImage = transformImageKitUrl(url, {width: 100, height: 100, crop: true, quality: 80, format: "auto"});
                      }
                    }
                    return (
                      <img src={thumbnailImage} alt={`Preview ${index + 1}`} />
                    );
                  })()}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, url)}
                    className="admin_gallery-remove-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            id="project-img"
            style={{ display: "none" }}
            multiple
          />
          <label htmlFor="project-img" className="admin_file-upload-wrapper">
            <p>Add Images/Videos to Gallery</p>
          </label>
        </div>
        <div className="admin_form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="admin_button admin_button-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="admin_button admin_button-success">
            Save Project
          </button>
        </div>
      </form>
    </div>
  );
};