import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DurationHistogram = ({ data }) => {
  // Ensure data is not empty
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Prepare the duration data in seconds
  const titles = data.map(song => song.title); // Get song titles
  const durationsInSeconds = data.map(song => song.duration_ms / 1000); // Convert durations from milliseconds to seconds

  // Prepare data for the histogram
  const durationData = {
    labels: titles, // Use song titles as labels
    datasets: [
      {
        label: 'Duration (seconds)', // Label for the dataset
        data: durationsInSeconds, // Use durations in seconds as the dataset values
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Song Duration vs. Title',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Duration (seconds)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Song Title',
        },
        ticks: {
          autoSkip: false, // Prevent skipping labels
          maxRotation: 90, // Rotate labels if needed
        },
      },
    },
  };

  return <Bar data={durationData} options={options} />;
};

export default DurationHistogram;
