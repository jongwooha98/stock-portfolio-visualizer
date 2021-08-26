import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './_home.scss';
import TopNav from './Nav/TopNav';
import BottomNav from './Nav/BottomNav';
import Newsfeed from './Newsfeed/Newsfeed';
import Portfolio from './Portfolio/Portfolio';
import Crud from '../firebase/Crud';
import Finnhub from '../finnhub/Finnhub';

function Home() {
  // Responsive Navbar
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 768);
  };
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  // Finnhub API
  const [myStocks, setMyStocks] = useState([]);
  const updateStockInfo = () => {
    Crud.getAll().onSnapshot((docs) => {
      let promises = [];
      let tempData = [];
      docs.forEach((doc) => {
        promises.push(
          Finnhub.getQuote(doc.data().ticker).then((response) => {
            tempData.push({
              id: doc.id,
              data: doc.data(),
              info: response,
            });
          })
        );
      });
      Promise.all(promises).then(() => {
        setMyStocks(tempData);
      });
    });
  };
  useEffect(() => {
    updateStockInfo();
    return () => {
      updateStockInfo();
    };
  }, []);

  return (
    <>
      <header className="app__header">
        {isDesktop ? <TopNav /> : <BottomNav />}
      </header>
      <Switch>
        <main className="app__container">
          <Route exact path="/" component={Newsfeed}>
            {/* <Newsfeed /> */}

            <Portfolio myStocks={myStocks} updateStockInfo={updateStockInfo} />

            {/* <Watchlist stocksData={stocksData} /> */}
          </Route>
        </main>
      </Switch>
    </>
  );
}

export default Home;
