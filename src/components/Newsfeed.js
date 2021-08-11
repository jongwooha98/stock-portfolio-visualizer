import React, { useState } from 'react';
import '../sass/_newsfeed.scss';
import LineGraph from './LineGraph';

function Newsfeed() {
  const [graphData, setGraphData] = useState({
    labels: [],
    data: [],
  });
  const calculatePortfolioValue = (arr) => {
    let portfolioValue = arr.data.reduce((a, b) => a + b, 0);
    portfolioValue = portfolioValue
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return portfolioValue;
  };
  return (
    <div className="newsfeed">
      <div className="newsfeed__container">
        <div className="newsfeed__chart-section">
          <div className="newsfeed__portfolio">
            <h1>{calculatePortfolioValue(graphData)}</h1>
            <p>+44.63 (+0.04%) Today</p>
          </div>
          <div className="newsfeed__chart">
            <LineGraph graphData={graphData} setGraphData={setGraphData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsfeed;
