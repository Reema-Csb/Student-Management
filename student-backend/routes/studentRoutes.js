const express = require("express");
const router = express.Router();

const {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentController");

// ✅ GET
router.get("/", getStudents);

// ✅ POST
router.post("/", createStudent);

// ✅ DELETE
router.delete("/:id", deleteStudent);

// ✅ UPDATE (PUT or PATCH)
router.put("/:id", updateStudent);
router.patch("/:id", updateStudent);

module.exports = router;