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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DurationHistogram = ({ data }) => {
  
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  
  const titles = data.map(song => song.title); 
  const durationsInSeconds = data.map(song => song.duration_ms / 1000); 

  const durationData = {
    labels: titles, 
    datasets: [
      {
        label: 'Duration (seconds)', 
        data: durationsInSeconds, 
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
          autoSkip: false,
          maxRotation: 90,
        },
      },
    },
  };

  return <Bar data={durationData} options={options} />;
};

export default DurationHistogram;
