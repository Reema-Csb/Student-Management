function StudentTable({ students, onEdit, onDelete, selected, onSelect }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <table className="w-full text-left border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Select</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Course</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t">

              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selected.includes(student.id)}
                  onChange={() => onSelect(student.id)}
                />
              </td>

              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.email}</td>
              <td className="p-2">{student.phone}</td>
              <td className="p-2">{student.course}</td>

              <td className="p-2">
                <button
                  onClick={() => onEdit(student)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(student.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;