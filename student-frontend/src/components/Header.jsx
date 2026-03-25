function Header({ onAdd, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      <div className="flex gap-2">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>

        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Student
        </button>
      </div>
    </div>
  );
}

export default Header;