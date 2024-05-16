import React from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ userRoles, activeUserRoles }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: "Active Employees Chart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Emplyees Roles",
        },
        ticks: {
          // Custom x-axis values
          callback: (value, index, values) => {
            return userRoles[index];
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Active Employees",
        },
        ticks: {
          stepSize: 1, // Display only integer values
        },
      },
    },
  };

  const customData = {
    labels: userRoles, // Custom x-axis labels
    datasets: [
      {
        label: "Custom Dataset",
        data: activeUserRoles, // Custom y-axis values
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={customData} />;
};

export default LineChart;
