import React from 'react';
import './_portfolio.scss';
import PortfolioPieChart from './PortfolioPieChart';
import PortfolioStock from './PortfolioStock';
import AddPortfolioStock from './AddPortfolioStock';
import { Alert } from '@material-ui/lab';

function Portfolio({ myStocks, updateStockInfo }) {
  return (
    <section className="portfolio">
      <div className="portfolio__pie-chart">
        {myStocks.length ? (
          <PortfolioPieChart
            myStocks={myStocks}
            updateStockInfo={updateStockInfo}
          />
        ) : (
          <Alert severity="info">
            Add stocks and start visualizing your portfolio!
          </Alert>
        )}
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
                ticker={stock.data.ticker}
                volume={stock.data.shares}
                name={stock.data.name}
                logo={stock.data.logo}
                openPrice={stock.info.openPrice}
                price={stock.info.currentPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
