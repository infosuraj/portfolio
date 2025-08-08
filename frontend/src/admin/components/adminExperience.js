import React, { useState, useEffect } from "react";
import {
  DeleteButton,
  EditButton,
} from "../../components/Miscellaneous/ManualButtons";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const generateYears = (start = 1990, end = new Date().getFullYear()) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const initialFormState = {
  title: "",
  position: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  description: "",
  currentlyWorking: false,
};

export const ExperienceTab = ({ experiences, onAddNew, onDelete, onEdit }) => {
  // Helper function to truncate text
  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="admin_card">
      <div className="admin_card-header">
        <h2 className="admin_card-title">Experiences</h2>
        <button onClick={onAddNew} className="admin_button admin_button-primary">
          Add New Experience
        </button>
      </div>
      <div className="admin_table-wrapper">
        <table className="admin_table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Position</th>
              <th>Period</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences && experiences.length > 0 ? (
              experiences.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp.title}</td>
                  <td>{exp.position}</td>
                  <td>
                    {exp.startDate} — {exp.endDate || "Present"}
                  </td>
                  <td>{truncateText(exp.description, 10)}</td> {/* Applied truncation here */}
                  <td className="admin_table-actions">
                    <EditButton onClick={() => onEdit(exp)} />
                    <DeleteButton onClick={() => onDelete(exp._id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No experiences added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ExperienceForm = ({ experience, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (experience) {
      const [startMonth, startYear] = experience.startDate.split(" ");

      let endMonth = "";
      let endYear = "";
      let currentlyWorking = false;

      if (experience.endDate === "Present") {
        currentlyWorking = true;
      } else if (experience.endDate && typeof experience.endDate === 'string') {
        [endMonth, endYear] = experience.endDate.split(" ");
      }

      setFormData({
        ...experience,
        startMonth,
        startYear,
        endMonth,
        endYear,
        currentlyWorking,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [experience]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = `${formData.startMonth} ${formData.startYear}`;
    let endDateToSave = null;

    if (formData.currentlyWorking) {
      endDateToSave = "Present";
    } else {
      if (!formData.endMonth || !formData.endYear) {
        alert("Please select both month and year for the end date, or check 'Present'.");
        return;
      }
      endDateToSave = `${formData.endMonth} ${formData.endYear}`;
    }

    const dataToSave = {
      ...formData,
      startDate,
      endDate: endDateToSave,
    };

    const success = await onSave(dataToSave, experience?._id);

    if (success) {
      onCancel();
    }
  };

  return (
    <div className="admin_card">
      <h2 className="admin_card-title">{experience ? "Edit" : "Add"} Experience</h2>
      <form onSubmit={handleSubmit} className="admin_form">
        <div className="admin_form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            className="admin_input"
          />
        </div>

        <div className="admin_form-group">
          <label>Position</label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => handleChange("position", e.target.value)}
            required
            className="admin_input"
          />
        </div>

        <div className="admin_form-group">
          <label>Start Date</label>
          <div className="admin_form-row">
            <select
              value={formData.startMonth}
              onChange={(e) => handleChange("startMonth", e.target.value)}
              required
              className="admin_select"
            >
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={formData.startYear}
              onChange={(e) => handleChange("startYear", e.target.value)}
              required
              className="admin_select"
            >
              <option value="">Year</option>
              {generateYears().map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin_form-group">
          <label>End Date</label>
          <div className="admin_form-row">
            <label className="admin_checkbox-label">
              <input
                type="checkbox"
                checked={formData.currentlyWorking}
                onChange={(e) =>
                  handleChange("currentlyWorking", e.target.checked)
                }
              />
              Present
            </label>
            {!formData.currentlyWorking && (
              <>
                <select
                  value={formData.endMonth}
                  onChange={(e) => handleChange("endMonth", e.target.value)}
                  className="admin_select"
                  required={!formData.currentlyWorking}
                >
                  <option value="">Month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.endYear}
                  onChange={(e) => handleChange("endYear", e.target.value)}
                  className="admin_select"
                  required={!formData.currentlyWorking}
                >
                  <option value="">Year</option>
                  {generateYears().map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>

        <div className="admin_form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            className="admin_input"
          />
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
          >
            Save Experience
          </button>
        </div>
      </form>
    </div>
  );
};