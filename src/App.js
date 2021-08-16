import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import TopNav from './components/Nav/TopNav';
import BottomNav from './components/Nav/BottomNav';
import Newsfeed from './components/Newsfeed/Newsfeed';
import Portfolio from './components/Portfolio/Portfolio';
import Watchlist from './components/Watchlist/Watchlist';
import './App.scss';
import { db } from './firebase/config';
import axios from 'axios';

// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = 'c4absuqad3if7805a640';
// const finnhubClient = new finnhub.DefaultApi();

// finnhubClient.companyProfile2({ symbol: 'AAPL' }, (error, data, response) => {
//   console.log(data);
// });

const TOKEN = 'c4absuqad3if7805a640';
const BASE_URL = 'https://finnhub.io/api/v1/quote?symbol=';

function App() {
  // Responsive Navbar
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 768);
  };
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  // Finnhub
  const [stocksData, setStocksData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);
  // get stock data from finnhub
  const getStocksData = (stock) => {
    return axios.get(`${BASE_URL}${stock}&token=${TOKEN}`).catch((error) => {
      console.error('Error', error.message);
    });
  };
  // const getStockQuote = (ticker) => {
  //   finnhubClient.quote(ticker, (error, data, response) => {
  //     console.log(data);
  //   });
  // };
  // get my stock data from firestore
  const getMyStocks = () => {
    db.collection('myStocks').onSnapshot((snapshot) => {
      let promises = [];
      let tempData = [];
      snapshot.docs.forEach((doc) => {
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
    <>
      <Router>
        <header className="app__header">
          {isDesktop ? <TopNav /> : <BottomNav />}
        </header>
        <Switch>
          <main className="app__container">
            <Route exact path="/" component={Newsfeed}>
              <Newsfeed />
              <Portfolio myStocks={myStocks} />
              <Watchlist stocksData={stocksData} />
            </Route>
          </main>
        </Switch>
      </Router>
    </>
  );
}
export default App;
