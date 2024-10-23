import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const DanceabilityScatterChart = ({ data }) => {
  // Prepare the data for the scatter chart
  const scatterData = {
    datasets: [
      {
        label: 'Song Index vs Danceability',
        data: data.map(song => ({
          x: song.index,                    // X-axis: Song Index
          y: song.danceability,              // Y-axis: Danceability
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Song Index',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Danceability',
        },
        min: 0, // Set minimum value for y-axis
        max: 1, // Set maximum value for y-axis
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const { x, y } = tooltipItem.raw;
            return [`Song Index: ${x}`, `Danceability: ${y.toFixed(2)}`];
          },
        },
      },
    },
  };

  return (
    <div>
      <h3>Song Index vs Danceability Scatter Chart</h3>
      <Scatter data={scatterData} options={options} />
    </div>
  );
};

export default DanceabilityScatterChart;
