import React, { useState, useEffect } from 'react';
import '../sass/_stats.scss';
import axios from 'axios';
import StatsRow from './StatsRow';
import { db } from '../firebase/firebase';

const TOKEN = 'c4absuqad3if7805a640';
const BASE_URL = 'https://finnhub.io/api/v1/quote?symbol=';

function Stats() {
  const [stocksData, setStocksData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);
  // get stock data from finnhub
  const getStocksData = (stock) => {
    return axios.get(`${BASE_URL}${stock}&token=${TOKEN}`).catch((error) => {
      console.error('Error', error.message);
    });
  };
  // get my stock data from firestore
  const getMyStocks = () => {
    db.collection('myStocks').onSnapshot((snapshot) => {
      let promises = [];
      let tempData = [];
      snapshot.docs.map((doc) => {
        promises.push(
          getStocksData(doc.data().ticker).then((res) => {
            tempData.push({
              id: doc.id,
              data: doc.data(),
              info: res.data,
            });
          })
        );
      });
      Promise.all(promises).then(() => {
        console.log(tempData);
        setMyStocks(tempData);
      });
    });
  };

  useEffect(() => {
    let testData = [];
    const stocksList = [
      'AAPL',
      'MSFT',
      'TSLA',
      'FB',
      'BABA',
      'UBER',
      'DIS',
      'SBUX',
    ];

    getMyStocks();
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStocksData(stock).then((res) => {
          testData.push({
            name: stock,
            ...res.data,
          });
        })
      );
    });

    Promise.all(promises).then(() => {
      setStocksData(testData);
    });
  }, []);

  return (
    <div className="stats">
      <div className="stats__container">
        {/* current stock holdings */}
        <div className="stats__header">
          <p>stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {myStocks.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                volume={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        {/* watchlist */}
        <div className="stats__header stats-lists">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stocksData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
