import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the prop types
interface LineChartProps {
  labels: string[];
  dataPoints: number[];
}

const DashboardLineChart: React.FC<LineChartProps> = ({ labels, dataPoints }) => {
  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DashboardLineChart;
