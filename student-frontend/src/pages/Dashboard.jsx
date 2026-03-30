import { useState, useEffect } from "react";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService.jsx";

import Header from "../components/Header.jsx";
import StudentTable from "../components/StudentTable.jsx";
import StudentModal from "../components/StudentModal.jsx";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 5;

  const start = (page - 1) * limit;
  const paginatedStudents = students.slice(start, start + limit);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      setError("Failed to fetch students");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");
    setMessage("");

    if (!formData.name || !formData.email || !formData.phone || !formData.course) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return;
    }

    if (!/^[0-9]+$/.test(formData.phone)) {
      setError("Phone must contain only numbers");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        await updateStudent(editId, formData);
        setMessage("Student updated successfully");
      } else {
        await createStudent(formData);
        setMessage("Student added successfully");
      }

      fetchStudents();
      setShowModal(false);
      setEditId(null);

      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
      });

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteStudent(id);
    fetchStudents();
    setLoading(false);
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditId(student.id);
    setShowModal(true);
  };

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleDeleteSelected = async () => {
    setLoading(true);
    for (let id of selected) {
      await deleteStudent(id);
    }
    setSelected([]);
    fetchStudents();
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <Header
        onAdd={() => {
          setShowModal(true);
          setEditId(null);
        }}
        onDelete={handleDeleteSelected}
      />

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      {/* ✅ SPINNER */}
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      <StudentTable
        students={paginatedStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selected={selected}
        onSelect={handleSelect}
      />

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Prev
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={start + limit >= students.length}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>

      {showModal && (
        <StudentModal
          formData={formData}
          handleChange={handleChange}
          handleSave={handleSave}
          onClose={() => setShowModal(false)}
          editId={editId}
        />
      )}

    </div>
  );
}

export default Dashboard;