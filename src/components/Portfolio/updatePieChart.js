import Crud from '../../firebase/Crud';

export const updatePieChart = (props) => {
  const ticker = props.map((stock) => stock.data.ticker);
  const shares = props.map((stock) => stock.data.shares);
  const color = props.map((stock) => stock.data.pieColor);
  const currentPrice = props.map((stock) => stock.info.quote.c);
  const currentValue = [];
  for (let i = 0; i < currentPrice.length; i++) {
    currentValue.push(shares[i] * currentPrice[i]);
  }

  return { ticker, shares, color, currentPrice, currentValue };
  // setMyCurrentStocks({
  //   ticker: ticker,
  //   shares: shares,
  //   currentPrice: currentPrice,
  //   currentValue: currentValue,
  //   pieColor: color,
  // });
};
