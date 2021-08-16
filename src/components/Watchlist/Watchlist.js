import React, { useState, useEffect } from 'react';
import './_lists.scss';
import StockStats from './StockStats';

function Watchlist({ stocksData }) {
  return (
    <section className="lists">
      {/* watchlist */}
      <div className="lists__header lists-lists">
        <p>Lists</p>
      </div>
      <div className="lists__content">
        <div className="lists__rows">
          {stocksData.map((stock) => (
            <StockStats
              key={stock.name}
              name={stock.name}
              openPrice={stock.o}
              price={stock.c}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Watchlist;
