import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

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
function random_rgb() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
}

function PortfolioPieChart({ myStocks }) {
  const [myCurrentStocks, setMyCurrentStocks] = useState({
    ticker: [],
    shares: [],
    currentPrice: [],
    currentValue: [],
    pieColor: [],
  });

  const updatePieChart = () => {
    let updatedTicker = myStocks.map((stock) => stock.data.ticker);
    let updatedShares = myStocks.map((stock) => stock.data.shares);
    let updatedPrice = myStocks.map();
    setMyCurrentStocks({
      ticker: updatedTicker,
      shares: [],
      currentPrice: [],
      currentValue: [],
      pieColor: [],
    });
  };

  const data = {
    labels: myCurrentStocks.ticker,
    datasets: [
      {
        label: 'My First Dataset',
        data: myCurrentStocks.currentValue,
        backgroundColor: myCurrentStocks.pieColor,
        hoverOffset: 4,
      },
    ],
  };
  console.log(myCurrentStocks);
  return (
    <div>
      <Pie
        data={data}
        // options={pieOptions}
        // ref={(input) => {
        //   chartInstance = input;
        // }}
      />
      <button onClick={updatePieChart}>Update</button>
      <div>{myCurrentStocks.ticker}</div>
      {/* current stock holdings */}
    </div>
  );
}

export default PortfolioPieChart;
