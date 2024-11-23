const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Mock workout data
const workouts = [
  { date: "2024-11-01", calories: 300, distance: 5, duration: 30 },
  { date: "2024-11-02", calories: 250, distance: 4, duration: 25 },
  { date: "2024-11-03", calories: 500, distance: 8, duration: 45 },
  { date: "2024-11-04", calories: 400, distance: 6, duration: 35 },
];

// Get all workouts
app.get("/api/workouts", (req, res) => {
  res.json(workouts);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
