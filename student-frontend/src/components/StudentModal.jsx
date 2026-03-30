import React, { useState } from "react";

function StudentModal({ formData, handleChange, handleSave, onClose, editId }) {

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState("");

  // ✅ VALIDATE SINGLE FIELD (REAL-TIME)
  const validateField = (name, value) => {
    let message = "";

    if (!value) {
      message = "This field is required";
    } else {
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          message = "Invalid email format";
        }
      }

      if (name === "phone") {
        if (!/^[0-9]+$/.test(value)) {
          message = "Phone must contain only numbers";
        }
        if (value.length !== 10) {
          message = "Phone must be 10 digits";
        }
      }

      if (name === "course") {
        if (value.length < 3) {
          message = "Course name too short";
        }
      }
    }

    return message;
  };

  // ✅ HANDLE CHANGE (REAL-TIME VALIDATION)
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    handleChange(e); // existing state update

    const errorMsg = validateField(name, value);

    setErrors({
      ...errors,
      [name]: errorMsg,
    });
  };

  // ✅ FINAL SUBMIT
  const handleSubmit = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key]);
      if (msg) newErrors[key] = msg;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSnackbar("Please fix errors before submitting");
      return;
    }

    handleSave();

    setSnackbar(editId ? "Student updated successfully" : "Student added successfully");

    setTimeout(() => {
      setSnackbar("");
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">

        <h2 className="text-xl font-bold mb-4">
          {editId ? "Edit Student" : "Add Student"}
        </h2>

        {/* 🔔 SNACKBAR */}
        {snackbar && (
          <div className="bg-blue-500 text-white p-2 mb-3 rounded text-center">
            {snackbar}
          </div>
        )}

        {/* NAME */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        {/* COURSE */}
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleInputChange}
          placeholder="Course"
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editId ? "Update" : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default StudentModal;