import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const App = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [stats, setStats] = useState({ calories: 0, distance: 0, duration: 0 });

  // Fetch data from backend (simulate workout logs)
  useEffect(() => {
    axios.get("/api/workouts")
      .then(response => {
        setWorkoutData(response.data);
        const totalCalories = response.data.reduce((acc, workout) => acc + workout.calories, 0);
        const totalDistance = response.data.reduce((acc, workout) => acc + workout.distance, 0);
        const totalDuration = response.data.reduce((acc, workout) => acc + workout.duration, 0);

        setStats({
          calories: totalCalories,
          distance: totalDistance,
          duration: totalDuration
        });
      })
      .catch(error => console.log(error));
  }, []);

  // Prepare chart data
  const chartData = {
    labels: workoutData.map((workout) => workout.date),
    datasets: [
      {
        label: "Calories Burned",
        data: workoutData.map((workout) => workout.calories),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Distance Covered (km)",
        data: workoutData.map((workout) => workout.distance),
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="app">
      <h1>Fitness Tracker Dashboard</h1>
      <div className="stats">
        <h2>Stats Summary</h2>
        <p>Calories Burned: {stats.calories}</p>
        <p>Distance Covered: {stats.distance} km</p>
        <p>Duration: {stats.duration} mins</p>
      </div>

      <div className="chart">
        <h2>Workout Trends</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default App;
