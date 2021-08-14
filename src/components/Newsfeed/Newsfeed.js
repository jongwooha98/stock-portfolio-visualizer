import React, { useState } from 'react';
import './_newsfeed.scss';
import AssetsGraph from './AssetsGraph';
import { Chip, Avatar } from '@material-ui/core';
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

  const [popularTopics, setTopics] = useState([
    'Technology',
    'Top Movies',
    'Upcoming Earnings',
    'Crypto',
    'Cannabis',
    'Healthcare Supplies',
    'Index ETFs',
    'Technology',
    'China',
    'Pharma',
  ]);
  return (
    <section className="newsfeed">
      <div className="newsfeed__portfolio__section">
        <h1>{calculatePortfolioValue(graphData)}</h1>
        <p>+44.63 (+0.04%) Today</p>
        <div className="newsfeed__chart">
          <AssetsGraph graphData={graphData} setGraphData={setGraphData} />
        </div>
      </div>
      <div className="newsfeed__buying-power__section">
        <h2> Buying Power</h2>
        <h2> $4.11</h2>
      </div>
      <div className="newsfeed__market__section">
        <div className="newsfeed__market__box">
          <p> Markets Closed</p>
          <h1> Happy Thanksgiving</h1>
        </div>
      </div>
      <div className="newsfeed__popularlists__section">
        <div className="newsfeed__popularlists__title">
          <h1>Popular lists</h1>
          <p>Show More</p>
        </div>
        <div className="newsfeed__popularlists__chips">
          {popularTopics.map((topic) => (
            <Chip
              className="topic-chip"
              variant="outlined"
              label={topic}
              avatar={
                <Avatar
                  src={`https://avatars.dicebear.com/api/human/${topic}.svg`}
                />
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Newsfeed;
