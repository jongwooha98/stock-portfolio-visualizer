import React from 'react';
import './_portfolio.scss';

import PortfolioPieChart from './PortfolioPieChart';
import PortfolioStock from './PortfolioStock';
import AddPortfolioStock from './AddPortfolioStock';

function Portfolio({ myStocks }) {
  return (
    <section className="portfolio">
      <div className="portfolio__pie-chart">
        <PortfolioPieChart myStocks={myStocks} />
      </div>
      <div className="portfolio__stocks">
        <div className="portfolio__stocks__header">
          <p>My Stocks</p>
          <AddPortfolioStock />
        </div>
        <div className="portfolio__stocks__list">
          <div className="portfolio__stock">
            {myStocks.map((stock) => (
              <PortfolioStock
                key={stock.id}
                id={stock.id}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                volume={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
