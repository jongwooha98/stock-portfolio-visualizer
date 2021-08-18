import React, { useState, useEffect } from 'react';
import './_portfolio.scss';
import { Pie } from 'react-chartjs-2';
import { Button } from '@material-ui/core';
import { updatePieChart } from './updatePieChart';

function commafy(num) {
  var str = num.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

function PortfolioPieChart({ myStocks }) {
  const [myCurrentStocks, setMyCurrentStocks] = useState({});
  const handleUpdate = () => {
    const updatedData = updatePieChart(myStocks);
    setMyCurrentStocks(updatedData);
  };
  useEffect(() => {
    const updatedData = updatePieChart(myStocks);
    setMyCurrentStocks(updatedData);
  }, [myStocks]);

  const data = {
    labels: myCurrentStocks.ticker,
    datasets: [
      {
        label: 'My Portfolio',
        data: myCurrentStocks.currentValue,
        backgroundColor: myCurrentStocks.color,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value, context) => {
          return context.dataIndex + ': ' + Math.round(value * 100) + '%';
        },
        color: '#fff',
      },
    },
  };

  return (
    <>
      <Pie
        data={data}
        options={options}
        // ref={(input) => {
        //   chartInstance = input;
        // }}
        maxHeight="760"
        maxWidth="760"
      />
      <Button
        onClick={() => handleUpdate()}
        variant="contained"
        color="primary"
      >
        Update
      </Button>
      {/* current stock holdings */}
    </>
  );
}

export default PortfolioPieChart;
