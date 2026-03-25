import { useState, useEffect } from "react";
import axios from "axios";

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

  // ✅ FETCH
  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SAVE
  const handleSave = async () => {
    if (editId) {
      await axios.put(
        `http://localhost:5000/api/students/${editId}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/students",
        formData
      );
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
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  // EDIT
  const handleEdit = (student) => {
    setFormData(student);
    setEditId(student.id);
    setShowModal(true);
  };

  // SELECT
  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // DELETE SELECTED
  const handleDeleteSelected = async () => {
    for (let id of selected) {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
    }
    setSelected([]);
    fetchStudents();
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

      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selected={selected}
        onSelect={handleSelect}
      />

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