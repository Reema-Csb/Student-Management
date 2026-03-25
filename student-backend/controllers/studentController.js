const pool = require("../db");  

// ✅ CREATE
exports.createStudent = async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;

    const result = await pool.query(
      "INSERT INTO students (name, email, phone, course) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, phone, course]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL
exports.getStudents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM students WHERE id = $1", [id]);

    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE (PATCH / PUT)
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, course } = req.body;

    const result = await pool.query(
      "UPDATE students SET name=$1, email=$2, phone=$3, course=$4 WHERE id=$5 RETURNING *",
      [name, email, phone, course, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};