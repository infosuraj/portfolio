import React, { useState, useEffect } from "react";
import {
  DeleteButton,
  EditButton,
} from "../../components/Miscellaneous/ManualButtons";

const defaultAward = {
  title: "",
  year: "",
  award: "",
  image: "",
  description: "",
  link: "",
};

export const AwardsTab = ({ awards, onAddNew, onEdit, onDelete }) => (
  <div className="admin_card">
    <div className="admin_card-header">
      <h2 className="admin_card-title">Awards</h2>
      <button onClick={onAddNew} className="admin_button admin_button-primary">
        Add New Award
      </button>
    </div>
    <div className="admin_table-wrapper">
      <table className="admin_table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Award</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {awards && awards.length > 0 ? (
            awards.map((award) => (
              <tr key={award._id}>
                <td>{award.title}</td>
                <td>{award.year}</td>
                <td>{award.award}</td>
                <td className="admin_table-actions">
                  <EditButton onClick={() => onEdit(award)} />
                  <DeleteButton onClick={() => onDelete(award._id)} />
                  {/* <button onClick={() => onEdit(award)} className="edit-btn">Edit</button>
                  <button onClick={() => onDelete(award._id)} className="delete-btn">Delete</button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No awards added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export const AwardForm = ({ award, onSave, onCancel, onImageUpload }) => {
  const [formData, setFormData] = useState(defaultAward);

  useEffect(() => {
    setFormData(award || defaultAward);
  }, [award]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const uploadedUrl = await onImageUpload(file, "awards");
    if (uploadedUrl) {
      setFormData((prev) => ({ ...prev, image: uploadedUrl.url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSave(formData, award?._id);
    if (success) onCancel();
  };

  return (
    <div className="admin_card">
      <h2 className="admin_card-title">
        {award ? "Edit Award" : "Add New Award"}
      </h2>
      <form onSubmit={handleSubmit} className="admin_form">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={formData.year}
          onChange={(e) => handleChange("year", e.target.value)}
        />
        <input
          type="text"
          placeholder="Award Name"
          value={formData.award}
          onChange={(e) => handleChange("award", e.target.value)}
        />
        <input
          type="text"
          placeholder="Link (optional)"
          value={formData.link}
          onChange={(e) => handleChange("link", e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <div className="admin_form-group">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            id="upload-award-image"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label
            htmlFor="upload-award-image"
            className="admin_file-upload-wrapper"
          >
            <span className="upload-btn">📤 Upload</span>
          </label>
          {formData.image && (
            <div
              className="admin_gallery-preview"
              style={{ marginTop: "0.5rem" }}
            >
              <img
                src={formData.image}
                alt="award preview"
                style={{ width: "100px", height: "auto" }}
              />
            </div>
          )}
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
            Save Award
          </button>
        </div>
      </form>
    </div>
  );
};
