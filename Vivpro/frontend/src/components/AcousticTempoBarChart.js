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

const AcousticTempoBarChart = ({ data }) => {
  
  const acousticData = data.map((song) => song.acousticness);
  const tempoData = data.map((song) => song.tempo);
  const songTitles = data.map((song) => song.title);

  const chartData = {
    labels: songTitles,
    datasets: [
      {
        label: 'Acousticness',
        data: acousticData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        barThickness: 15,
      },
      {
        label: 'Tempo',
        data: tempoData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        barThickness: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Songs',
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        min: 0,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h3>Acousticness and Tempo Bar Chart</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AcousticTempoBarChart;
