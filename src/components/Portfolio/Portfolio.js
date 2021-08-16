import React from 'react';
import PortfolioPieChart from './PortfolioPieChart';
import PortfolioStock from './PortfolioStock';

function Portfolio({ myStocks }) {
  return (
    <section className="portfolio">
      <PortfolioPieChart myStocks={myStocks} />
      <div className="lists__header">
        <p>My Stocks</p>
      </div>

      <div className="lists__content">
        <div className="lists__rows">
          {myStocks.map((stock) => (
            <PortfolioStock
              key={stock.data.ticker}
              name={stock.data.ticker}
              openPrice={stock.info.o}
              volume={stock.data.shares}
              price={stock.info.c}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
