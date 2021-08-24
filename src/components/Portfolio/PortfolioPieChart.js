import React, { useState, useEffect } from 'react';
import './_portfolio.scss';
import { Pie } from 'react-chartjs-2';
import { Button } from '@material-ui/core';
// import { updatePieChart } from './updatePieChart';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// function commafy(num) {
//   var str = num.toString().split('.');
//   if (str[0].length >= 5) {
//     str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
//   }
//   if (str[1] && str[1].length >= 5) {
//     str[1] = str[1].replace(/(\d{3})/g, '$1 ');
//   }
//   return str.join('.');
// }

function PortfolioPieChart({ myStocks, updateStockInfo }) {
  console.log(myStocks);
  const [myCurrentStocks, setMyCurrentStocks] = useState({});

  const updatePieChart = (props) => {
    const ticker = props.map((stock) => stock.data.ticker);
    const shares = props.map((stock) => stock.data.shares);
    const color = props.map((stock) => stock.data.pieColor);
    const currentPrice = props.map((stock) => stock.info.currentPrice);
    const currentValue = [];
    for (let i = 0; i < currentPrice.length; i++) {
      currentValue.push(shares[i] * currentPrice[i]);
    }

    return { ticker, shares, color, currentPrice, currentValue };
  };

  const handleUpdate = () => {
    updateStockInfo();
    // const updatedData = updatePieChart(myStocks);
    // setMyCurrentStocks(updatedData);
    console.log('updating manually...');
  };
  useEffect(() => {
    const updatedData = updatePieChart(myStocks);
    setMyCurrentStocks(updatedData);
  }, []);
  // console.log(myCurrentStocks);

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
    // responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,

        formatter: (value, context) => {
          let datasets = context.chart.data.datasets;
          if (datasets.indexOf(context.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            let percentage = Math.round((value / sum) * 100) + '%';
            let label = context.chart.data.labels[context.dataIndex];

            return [label, percentage];
          } else {
            return '';
          }
        },
        color: '#fff',
        // offset: 'start',
      },
    },
  };

  return (
    <>
      <div>
        <Pie data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
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
