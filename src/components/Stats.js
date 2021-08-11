import React from 'react';
import '../sass/_stats.scss';

function Stats() {
  return (
    <div className="stats">
      <div className="stats__container">
        {/* current stock holdings */}
        <div className="stats__header">
          <p>stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows"></div>
        </div>
        {/* watchlist */}
        <div className="stats__header">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows"></div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
