import React, { useState, useEffect, useRef } from "react";
import {
  AddButton,
  DeleteButton,
} from "../../components/Miscellaneous/ManualButtons";

const defaultClient = {
  link: "", // Added link field
  clientImage: "",
};

export const ClientsTab = ({ clients, onAddNew, onDelete }) => (
  <div className="admin_card">
    <div className="admin_card-header">
      <h2 className="admin_card-title">Clients</h2>
      <button onClick={onAddNew} className="admin_button admin_button-primary">
        Add New Client
      </button>
    </div>
    <div className="admin_table-wrapper">
      <table className="admin_table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Link</th> {/* Added Link header */}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client._id}>
                <td>
                  {client.clientImage && (
                    <img
                      src={client.clientImage}
                      alt="client"
                      style={{ width: "15%", borderRadius: "4px" }}
                    />
                  )}
                </td>
                <td>
                  {client.link ? ( // Display link if it exists
                    <a href={client.link} target="_blank" rel="noopener noreferrer">
                      {client.link}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <DeleteButton onClick={() => onDelete(client._id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}> {/* Adjusted colspan */}
                No clients added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export const ClientForm = ({ client, onSave, onCancel, onImageUpload }) => {
  const [formData, setFormData] = useState(
    client
      ? { link: client.link || "", clientImage: client.clientImage || "" } // Initialize with existing link
      : defaultClient
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData(
      client
        ? { link: client.link || "", clientImage: client.clientImage || "" }
        : defaultClient
    );
  }, [client]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadedUrl = await onImageUpload(file, "clients");
    if (uploadedUrl) {
      setFormData((prev) => ({
        ...prev,
        clientImage: uploadedUrl,
      }));
    }
  };

  const handleImageDelete = () => {
    setFormData((prev) => ({
      ...prev,
      clientImage: "",
    }));
  };

  const handleLinkChange = (e) => { // New handler for link input
    setFormData((prev) => ({
      ...prev,
      link: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientImage) {
      alert("Please upload a client logo.");
      return;
    }
    const success = await onSave(formData, client?._id);
    if (success) onCancel();
  };

  const handleAddButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="admin_card">
      <h2 className="admin_card-title">
        {client ? "Edit Client" : "Add New Client"}
      </h2>
      <form onSubmit={handleSubmit} className="">
        {/* Link Input Field */}
        <div className="admin_form-group">
          <label htmlFor="client-link">Client Link</label>
          <input
            type="url" // Use type="url" for better validation
            id="client-link"
            name="link"
            value={formData.link}
            onChange={handleLinkChange} // Use the new handler
            className="admin_input"
            placeholder="e.g., https://www.example.com"
          />
        </div>

        <div className="admin_form-group">
          <label>Upload Client Logo</label>
          <input
            type="file"
            accept="image/*"
            id="upload-client-image"
            style={{ display: "none" }}
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!formData.clientImage && (
              <AddButton
                buttonText="Upload Image"
                onClick={handleAddButtonClick}
              />
            )}
          </div>
          {formData.clientImage && (
            <div
              className="admin_gallery-preview"
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={formData.clientImage}
                  alt="Client Preview"
                  style={{
                    height: "30%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <DeleteButton
                    style={{ width: "50px", height: "50px" }}
                    onClick={handleImageDelete}
                  />
                </div>
              </div>
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
            Save Client
          </button>
        </div>
      </form>
    </div>
  );
};