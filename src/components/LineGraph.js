import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import '../sass/_linegraph.scss';

function LineGraph({ graphData, setGraphData }) {
  const data = {
    labels: graphData.labels,
    datasets: [
      {
        label: '$',
        borderColor: '#2e51fa',
        fill: false,
        data: graphData.data,
        borderWidth: 2,
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBackgroundColor: '#2e51fa',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 4,
        pointHoverRadius: 6,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        display: false,
      },

      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {},
      },
    },
  };
  const generateData = () => {
    let currentLabel = [];
    let currentData = [];

    let value = 50;
    for (var i = 0; i < 366; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      value += Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 100);
      currentLabel.push(date);
      currentData.push(value);
    }
    // console.log(currentLabel, currentData);
    setGraphData({
      labels: currentLabel,
      data: currentData,
    });
  };
  console.log(graphData.data);
  useEffect(() => {
    generateData();
  }, []);
  return (
    <div className="linegraph">
      <Line type="line" data={data} options={options} />
    </div>
  );
}

export default LineGraph;
