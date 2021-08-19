import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import TopNav from './components/Nav/TopNav';
import BottomNav from './components/Nav/BottomNav';
import Newsfeed from './components/Newsfeed/Newsfeed';
import Portfolio from './components/Portfolio/Portfolio';
import Watchlist from './components/Watchlist/Watchlist';
import './App.scss';
import { db } from './firebase/firebase';
import axios from 'axios';
import Crud from './firebase/Crud';

// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = 'c4absuqad3if7805a640';
// const finnhubClient = new finnhub.DefaultApi();

const TOKEN = 'c4absuqad3if7805a640';
const BASE_URL = 'https://finnhub.io/api/v1';

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
  const [myStocks, setMyStocks] = useState([]);
  const getStockInfo = (ticker) => {
    const quote = `${BASE_URL}/quote?symbol=${ticker}&token=${TOKEN}`;
    const companyProfile2 = `${BASE_URL}/stock/profile2?symbol=${ticker}&token=${TOKEN}`;

    const getQuote = axios.get(quote);
    const getCompanyProfile2 = axios.get(companyProfile2);

    return axios
      .all([getQuote, getCompanyProfile2])
      .then(
        axios.spread((...response) => {
          const responseQuote = response[0].data;
          const responseCompanyProfile2 = response[1].data;

          return {
            quote: responseQuote,
            companyProfile2: responseCompanyProfile2,
          };
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
    // return axios
    //     .get(quote)
    //     .catch((error) => {
    //       console.error('Error', error.message);
    //     });
  };
  const onDataChange = (items) => {
    let promises = [];
    let tempData = [];
    items.forEach((item) => {
      promises.push(
        getStockInfo(item.data().ticker).then((response) => {
          tempData.push({
            id: item.id,
            data: item.data(),
            info: response,
          });
        })
      );
    });
    Promise.all(promises).then(() => {
      console.log(tempData);
      setMyStocks(tempData);
    });
  };

  useEffect(() => {
    const unsubscribe = Crud.getAll().onSnapshot(onDataChange);
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(myStocks);
  return (
    <>
      <Router>
        <header className="app__header">
          {isDesktop ? <TopNav /> : <BottomNav />}
        </header>
        <Switch>
          <main className="app__container">
            <Route exact path="/" component={Newsfeed}>
              {/* <Newsfeed /> */}
              <Portfolio myStocks={myStocks} />
              {/* <Watchlist stocksData={stocksData} /> */}
            </Route>
          </main>
        </Switch>
      </Router>
    </>
  );
}
export default App;
