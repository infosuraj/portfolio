import React, { useState, useEffect } from 'react';
import { DeleteButton, EditButton } from '../../components/Miscellaneous/ManualButtons';

export const TestimonialsTab = ({ testimonials, onAddNew, onEdit, onDelete }) => (
  <div className="admin_card">
    <div className="admin_card-header">
      <h2 className="admin_card-title">Testimonials</h2>
      <button onClick={onAddNew} className="admin_button admin_button-primary">
        Add New Testimonial
      </button>
    </div>
    <div className="admin_table-wrapper">
      <table className="admin_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <tr key={testimonial._id}>
                <td>{testimonial.name}</td>
                <td>{testimonial.position}</td>
                <td className="admin_table-actions">
                  <EditButton onClick={() => onEdit(testimonial)} />
                  <DeleteButton onClick={() => onDelete(testimonial._id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3" style={{ textAlign: 'center' }}>No testimonials available.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const defaultTestimonial = {
  name: '',
  position: '',
  image: '',
  content: '',
};

export const TestimonialForm = ({ testimonial, onSave, onCancel, onImageUpload }) => {
  const [formData, setFormData] = useState(defaultTestimonial);

  useEffect(() => {
    setFormData(testimonial || defaultTestimonial);
  }, [testimonial]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const uploadedUrl = await onImageUpload(file, 'testimonials');
    if (uploadedUrl) {
      setFormData((prev) => ({ ...prev, image: uploadedUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSave(formData, testimonial?._id);
    if (success) onCancel();
  };

  return (
    <div className="admin_card">
      <h2 className="admin_card-title">{testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
      <form onSubmit={handleSubmit} className="admin_form">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          value={formData.position}
          onChange={(e) => handleChange('position', e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
        />

        <div className="admin_form-group">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            id="upload-testimonial-image"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="upload-testimonial-image" className="admin_file-upload-wrapper">
            <span className="upload-btn">📤 Upload</span>
          </label>
          {formData.image && (
            <div className='admin_gallery-preview' style={{ marginTop: '0.5rem' }}>
              <img src={formData.image} alt="preview" style={{ width: '100px' }} />
            </div>
          )}
        </div>

        <div className="admin_form-actions">
          <button type="button" onClick={onCancel} className="admin_button admin_button-secondary">
            Cancel
          </button>
          <button type="submit" className="admin_button admin_button-success">
            Save Testimonial
          </button>
        </div>
      </form>
    </div>
  );
};