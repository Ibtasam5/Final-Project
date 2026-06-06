import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ResultChart({ students }) {
  const data = {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        label: "Students",
        data: [
          students.filter((s) => s.grade === "A").length,
          students.filter((s) => s.grade === "B").length,
          students.filter((s) => s.grade === "C").length,
          students.filter((s) => s.grade === "D").length,
          students.filter((s) => s.grade === "F").length,
        ],
        backgroundColor: "#3b82f6",
        borderColor: "#2563eb",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#000000",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000000",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        min: 0,
        max: 10,
        ticks: {
          color: "#000000",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div className="card shadow border-0 mt-4">
      <div className="card-body">
        <h4>Result Analytics</h4>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default ResultChart;