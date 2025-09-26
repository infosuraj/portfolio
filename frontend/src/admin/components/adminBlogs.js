import React, { useState, useEffect } from 'react';
import { AddButton, DeleteButton, EditButton } from '../../components/Miscellaneous/ManualButtons';
const defaultBlog = {
  title: '',
  date: '',
  author: '',
  image: '',
  link: '',
  categories: []
};

export const BlogsTab = ({ blogs, onAddNew, onEdit, onDelete }) => (
  <div className="admin_card">
    <div className="admin_card-header">
      <h2 className="admin_card-title">Blogs</h2>
      <button onClick={onAddNew} className="admin_button admin_button-primary">
        Add New Blog
      </button>
    </div>
    <div className="admin_table-wrapper">
      <table className="admin_table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.date}</td>
                <td>{blog.author}</td>
                <td className="admin_table-actions">
                    <EditButton onClick={() => onEdit(blog)} />
                    <DeleteButton onClick={() => onDelete(blog._id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No blogs added yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export const BlogForm = ({ blog, onSave, onCancel, onImageUpload }) => {
  const [formData, setFormData] = useState(defaultBlog);

  useEffect(() => {
    setFormData(blog || defaultBlog);
  }, [blog]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (index, value) => {
    const updated = [...formData.categories];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, categories: updated }));
  };

  const addCategory = () =>
    setFormData((prev) => ({
      ...prev,
      categories: [...prev.categories, '']
    }));

  const removeCategory = (index) => {
    const updated = formData.categories.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, categories: updated }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const uploadedUrl = await onImageUpload(file, 'blogs');
    if (uploadedUrl) {
      setFormData((prev) => ({ ...prev, image: uploadedUrl.url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSave(formData, blog?._id);
    if (success) onCancel();
  };

  return (
    <div className="admin_card">
      <h2 className="admin_card-title">{blog ? 'Edit Blog' : 'Add New Blog'}</h2>
      <form onSubmit={handleSubmit} className="admin_form">
        <input type="text" placeholder="Title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
        <input type="date" placeholder="Date (e.g. June 2025)" value={formData.date} onChange={(e) => handleChange('date', e.target.value)} />
        <input type="text" placeholder="Author" value={formData.author} onChange={(e) => handleChange('author', e.target.value)} />
        <input type="text" placeholder="Link" value={formData.link} onChange={(e) => handleChange('link', e.target.value)} />
        
        <div className="admin_form-group">
          <label>Upload Cover Image</label>
          <input
            type="file"
            accept="image/*"
            id="upload-blog-image"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="upload-blog-image" className="admin_file-upload-wrapper">
            <span className="upload-btn">📤 Upload</span>
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
                style={{ width: '30%'}}
              />
              <div style={{ marginLeft: '13%', marginTop: '10px'}}>
              <DeleteButton onClick={() => removeCategory(idx)} />
                </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'start' }}>
          <AddButton onClick={addCategory} buttonText="Add Category" />
          </div>
          {formData.categories.length === 0 && (
                <p className="text-muted">
                  No Catergories Added!
                </p>
              )}
        </div>

        <div className="admin_form-actions">
          <button type="button" onClick={onCancel} className="admin_button admin_button-secondary">
            Cancel
          </button>
          <button type="submit" className="admin_button admin_button-success">
            Save Blog
          </button>
        </div>
      </form>
    </div>
  );
};