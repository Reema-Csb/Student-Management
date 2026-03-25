const express = require("express");
const cors = require("cors");

const app = express();

const studentRoutes = require("./routes/studentRoutes");

app.use(cors());
app.use(express.json());

// ✅ ADD HERE
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// ✅ EXISTING
app.use("/api/students", studentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});