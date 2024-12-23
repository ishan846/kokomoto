import React from "react";
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

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the prop types
interface BarChartProps {
  labels: string[]; // Labels for the x-axis
  dataPoints: number[]; // Data points for the dataset
}

const DashboardBarChart: React.FC<BarChartProps> = ({ labels, dataPoints }) => {
  // Data for the chart
  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: dataPoints,
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Bar color
        borderColor: "rgb(75, 192, 192)", // Border color
        borderWidth: 1,
      },
    ],
  };

  // Configuration options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sales Bar Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure y-axis starts at zero
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default DashboardBarChart;
