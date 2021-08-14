import React, { useState, useEffect } from 'react';
import './_lists.scss';
import axios from 'axios';
import StockStats from './StockStats';
import { db } from '../../firebase/firebase';

const TOKEN = 'c4absuqad3if7805a640';
const BASE_URL = 'https://finnhub.io/api/v1/quote?symbol=';

function Lists() {
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
    <section className="lists">
      {/* current stock holdings */}
      <div className="lists__header">
        <p>stocks</p>
      </div>
      <div className="lists__content">
        <div className="lists__rows">
          {myStocks.map((stock) => (
            <StockStats
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

export default Lists;
