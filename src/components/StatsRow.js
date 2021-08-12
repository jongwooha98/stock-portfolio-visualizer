import React from 'react';
import '../sass/_stats.scss';

function StatsRow(props) {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;
  const getModal = () => {};
  return (
    <div className="row" onClick={getModal}>
      <div className="row__intro">
        <h1>{props?.name}</h1>
        <p>{props.volume && props.volume + ' shares'}</p>
      </div>
      <div className="row__chart">
        {/* <img src={StockChart} height={16}/> */}
      </div>
      <div className="row__numbers">
        <p className="row__price">{props.price}</p>

        <p
          className={
            percentage > 0
              ? 'row__percentage-positive'
              : percentage < 0
              ? 'row__percentage-negative'
              : 'row__percentage'
          }
        >
          {Number(percentage).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default StatsRow;
