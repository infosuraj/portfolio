import React, { useState, useEffect, useCallback } from "react";
import {
  DeleteButton,
  AddButton, // Re-import your custom AddButton
  EditButton,
} from "../../components/Miscellaneous/ManualButtons";

const initialFormState = {
  items: [],
  skillsProgress: [],
};

export const SkillTab = ({ skills, onEdit, onDelete, onAddNew }) => (
  <div className="admin_card">
    <div className="admin_card-header">
      <h2 className="admin_card-title">Skills</h2>
      {/* Conditionally render Add New Skills Section button or Edit/Delete buttons */}
      {!(skills && skills.length > 0) ? (
        <button
          onClick={onAddNew}
          className="admin_button admin_button-primary"
        >
          Add New Skills Section
        </button>
      ) : (
        // Assuming skills array will only have one document for simplicity as per existing logic.
        // If there can be multiple skill documents, you'll need to decide how to select which one to edit/delete.
        // For now, assuming skillDoc refers to the first item if skills exist.
        // If you intend to edit/delete individual items or categories from this view,
        // the buttons would need to be within their respective map functions,
        // and your onEdit/onDelete functions would need to handle specific item/category IDs.
        skills[0] && ( // Check if the first skill document exists
          // Wrapped buttons in a div and added Tailwind classes for alignment
          <div className="flex items-center space-x-2 ml-auto">
            {" "}
            {/* Use ml-auto to push to the right */}
            <EditButton
              onClick={() => onEdit(skills[0]._id, "document", skills[0])}
            />
            <DeleteButton onClick={() => onDelete(skills[0]._id, "document")} />
          </div>
        )
      )}
    </div>
    <div className="admin_table-wrapper">
      <table className="admin_table">
        <thead>
          <tr>
            <th>Skill Items</th>
            <th>Skill Progress Categories</th>
          </tr>
        </thead>
        <tbody>
          {skills && skills.length > 0 ? (
            skills.map((skillDoc) => (
              <tr key={skillDoc._id}>
                <td>
                  {/* Skill Items Table */}
                  <table className="admin_nested-table">
                    <thead>
                      <tr>
                        <th>Icon</th>
                        <th>Skill Item</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skillDoc.items?.map((item, idx) => (
                        <tr key={item._id || `skill-item-${idx}`}>
                          <td>
                            {item.icon && (
                              <img
                                src={item.icon}
                                alt="icon"
                                style={{ width: "24px", height: "24px" }}
                              />
                            )}
                          </td>
                          <td>
                            {item.label?.toUpperCase() || "N/A"} — {item.value}
                          </td>
                          <td>
                            <DeleteButton
                              onClick={() =>
                                onDelete(skillDoc._id, "item", item._id)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>
                  {skillDoc.skillsProgress?.map((category) => (
                    <div
                      key={
                        category._id ||
                        `skill-category-${category.categoryTitle}`
                      }
                      className="skills-category-block"
                    >
                      <div className="skills-category-header">
                        <h4>
                          {category.categoryTitle?.toUpperCase() || "N/A"}
                        </h4>
                        <DeleteButton
                          onClick={() =>
                            onDelete(skillDoc._id, "category", category._id)
                          }
                        />
                      </div>
                      <table className="admin_nested-table">
                        <thead>
                          <tr>
                            <th>Skill Name</th>
                            <th>Progress</th>
                            <th>Actions</th>{" "}
                            {/* Added Actions column for nested skills */}
                          </tr>
                        </thead>
                        <tbody>
                          {category.skills?.map((s) => (
                            <tr key={s._id || `nested-skill-${s.name}`}>
                              <td>{s.name || "N/A"}</td>
                              <td>{s.progress}%</td>
                              <td>
                                <DeleteButton
                                  onClick={() =>
                                    onDelete(skillDoc._id, "nestedSkill", {
                                      categoryId: category._id,
                                      skillId: s._id,
                                    })
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                No skills added yet. Click "Add New Skills Section" to get
                started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export const SkillForm = ({ skill, onSave, onCancel, onImageUpload }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (skill) {
      setFormData(JSON.parse(JSON.stringify(skill)));
    } else {
      setFormData(initialFormState);
    }
  }, [skill]);

  const updateFormData = useCallback((updater) => {
    setFormData(updater);
  }, []);

  const handleItemChange = useCallback(
    (index, key, value) => {
      updateFormData((prev) => {
        const updatedItems = [...prev.items];
        updatedItems[index][key] = value;
        return { ...prev, items: updatedItems };
      });
    },
    [updateFormData]
  );

  const handleItemIconUpload = useCallback(
    async (index, file) => {
      const uploadedUrl = await onImageUpload(file, "skills");
      if (uploadedUrl) {
        updateFormData((prev) => {
          const updatedItems = [...prev.items];
          updatedItems[index].icon = uploadedUrl;
          return { ...prev, items: updatedItems };
        });
      }
    },
    [onImageUpload, updateFormData]
  );

  const addItem = useCallback(() => {
    updateFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          icon: "",
          value: "",
          label: "",
          description: "",
          tempId: Date.now() + Math.random(),
        },
      ],
    }));
  }, [updateFormData]);

  const removeItem = useCallback(
    (index) => {
      updateFormData((prev) => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index),
      }));
    },
    [updateFormData]
  );

  const handleCategoryChange = useCallback(
    (catIndex, key, value) => {
      updateFormData((prev) => {
        const updatedCategories = [...prev.skillsProgress];
        updatedCategories[catIndex][key] = value;
        return { ...prev, skillsProgress: updatedCategories };
      });
    },
    [updateFormData]
  );

  const addCategory = useCallback(() => {
    updateFormData((prev) => ({
      ...prev,
      skillsProgress: [
        ...prev.skillsProgress,
        { categoryTitle: "", skills: [], tempId: Date.now() + Math.random() },
      ],
    }));
  }, [updateFormData]);

  const removeCategory = useCallback(
    (catIndex) => {
      updateFormData((prev) => ({
        ...prev,
        skillsProgress: prev.skillsProgress.filter((_, i) => i !== catIndex),
      }));
    },
    [updateFormData]
  );

  const handleNestedSkillChange = useCallback(
    (catIndex, skillIndex, key, value) => {
      updateFormData((prev) => {
        const updatedCategories = [...prev.skillsProgress];
        const updatedSkills = [...updatedCategories[catIndex].skills];
        updatedSkills[skillIndex][key] =
          key === "progress" ? parseInt(value) : value;
        updatedCategories[catIndex].skills = updatedSkills;
        return { ...prev, skillsProgress: updatedCategories };
      });
    },
    [updateFormData]
  );

  const addNestedSkill = useCallback(
    (catIndex) => {
      updateFormData((prev) => {
        const updatedCategories = [...prev.skillsProgress];
        if (!updatedCategories[catIndex].skills) {
          updatedCategories[catIndex].skills = [];
        }
        const newSkill = {
          name: "",
          progress: 0,
          tempId: Date.now() + Math.random(),
        };
        updatedCategories[catIndex].skills.push(newSkill);
        return { ...prev, skillsProgress: updatedCategories };
      });
    },
    [updateFormData]
  );

  const removeNestedSkill = useCallback(
    (catIndex, skillIndex) => {
      updateFormData((prev) => {
        const updatedCategories = [...prev.skillsProgress];
        updatedCategories[catIndex].skills = updatedCategories[
          catIndex
        ].skills.filter((_, i) => i !== skillIndex);
        return { ...prev, skillsProgress: updatedCategories };
      });
    },
    [updateFormData]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const success = await onSave(formData);
      if (success) {
        onCancel();
      }
    },
    [onSave, formData, onCancel]
  );

  const canCreateNewDocument =
    !skill && (formData.items.length > 0 || formData.skillsProgress.length > 0);

  return (
    <div className="admin_card">
      <h2 className="admin_card-title">
        {skill ? "Edit Skills" : "Create New Skills Document"}
      </h2>
      <form onSubmit={handleSubmit} className="admin_form">
        {skill && (
          <p className="admin_info_message">
            Make your changes and click "Save All Changes" at the bottom.
          </p>
        )}

        {/* Skill Items Section */}
        <div className="admin_form-group admin_form-full-width">
          <h3>Skill Items</h3>
          {formData.items.map((item, idx) => (
            <div key={item._id || item.tempId} className="admin_skill-block">
              <input
                type="text"
                placeholder="Value (e.g., HTML)"
                value={item.value || ""}
                onChange={(e) => handleItemChange(idx, "value", e.target.value)}
              />
              <input
                type="text"
                placeholder="Label (e.g., Markup Language)"
                value={item.label || ""}
                onChange={(e) => handleItemChange(idx, "label", e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={item.description || ""}
                onChange={(e) =>
                  handleItemChange(idx, "description", e.target.value)
                }
              />
              <div className="admin_form-group">
                <input
                  type="file"
                  accept="image/*"
                  id={`upload-${idx}`}
                  onChange={(e) => handleItemIconUpload(idx, e.target.files[0])}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor={`upload-${idx}`}
                  className="admin_file-upload-wrapper"
                >
                  <p>Upload Icon</p>
                </label>
                {item.icon && (
                  <div className="admin_gallery-preview">
                    <img
                      src={item.icon}
                      alt="icon preview"
                      style={{ height: "100px" }}
                    />
                  </div>
                )}
              </div>
              <div className="admin_action-buttons-group align-right">
                <DeleteButton onClick={() => removeItem(idx)} />
              </div>
            </div>
          ))}
          <div className="admin_action-buttons-group center-buttons">
            <AddButton onClick={addItem} buttonText="Add Skill Item" />
          </div>
        </div>

        {/* Skill Progress Categories Section */}
        <div className="admin_form-group admin_form-full-width">
          <h3>Skill Progress Categories</h3>
          {formData.skillsProgress.map((category, catIndex) => (
            <div
              key={category._id || category.tempId}
              className="admin_category-block"
            >
              <div className="admin_input-with-button">
                <input
                  type="text"
                  placeholder="Category Title (e.g., Frontend)"
                  value={category.categoryTitle || ""}
                  onChange={(e) =>
                    handleCategoryChange(
                      catIndex,
                      "categoryTitle",
                      e.target.value
                    )
                  }
                  style={{ marginBottom: "20px" }}
                />
                <DeleteButton onClick={() => removeCategory(catIndex)} />
              </div>

              <h4 style={{ marginTop: "15px", textAlign: "center" }}>
                Skills within "{category.categoryTitle || "New Category"}"
              </h4>
              {category.skills.map((s, skillIndex) => (
                <div
                  key={s._id || s.tempId}
                  className="admin_nested-skill-block"
                >
                  <input
                    type="text"
                    placeholder="Skill Name (e.g., React.js)"
                    value={s.name || ""}
                    onChange={(e) =>
                      handleNestedSkillChange(
                        catIndex,
                        skillIndex,
                        "name",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="number"
                    placeholder="Progress % (e.g., 85)"
                    value={s.progress || 0}
                    min="0"
                    max="100"
                    onChange={(e) =>
                      handleNestedSkillChange(
                        catIndex,
                        skillIndex,
                        "progress",
                        e.target.value
                      )
                    }
                    style={{ marginBottom: "10px" }}
                  />
                  <div className="admin_action-buttons-group align-right">
                    <DeleteButton
                      onClick={() => removeNestedSkill(catIndex, skillIndex)}
                    />
                  </div>
                </div>
              ))}
              <div className="admin_action-buttons-group center-buttons">
                <AddButton
                  onClick={() => addNestedSkill(catIndex)}
                  buttonText="Add Skill to Category"
                />
              </div>
            </div>
          ))}
          <div className="admin_action-buttons-group center-buttons">
            <AddButton
              onClick={addCategory}
              buttonText="Add New Skill Category"
            />
          </div>
        </div>

        <div className="admin_form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="admin_button admin_button-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="admin_button admin_button-success"
            disabled={!skill && !canCreateNewDocument}
          >
            {skill ? "Save All Changes" : "Create New Skills Document"}
          </button>
        </div>
      </form>
    </div>
  );
};
