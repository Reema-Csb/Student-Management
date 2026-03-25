function StudentModal({
    formData,
    handleChange,
    handleSave,
    onClose,
    editId,
  }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-96">
  
          <h2 className="text-xl font-bold mb-4">
            {editId ? "Edit Student" : "Add Student"}
          </h2>
  
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 mb-2"
          />
  
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 mb-2"
          />
  
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-2 mb-2"
          />
  
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            className="w-full border p-2 mb-4"
          />
  
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
  
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {editId ? "Update" : "Save"}
            </button>
          </div>
  
        </div>
      </div>
    );
  }
  
  export default StudentModal;