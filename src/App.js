import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import { HashLink as Link } from 'react-router-hash-link';
import TopNav from './components/Nav/TopNav';
import BottomNav from './components/Nav/BottomNav';
import Newsfeed from './components/Newsfeed/Newsfeed';
import Portfolio from './components/Portfolio/Portfolio';
// import Watchlist from './components/Watchlist/Watchlist';
import './App.scss';
// import { db } from './firebase/firebase';
// import axios from 'axios';
import Crud from './firebase/Crud';
import Finnhub from './finnhub/Finnhub';
import { LinearProgress } from '@material-ui/core';

const customStyles = {
  root: {
    flexGrow: 1,
  },
  colorPrimary: {
    background: '#fff',
  },
};

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

  // Finnhub API
  // const TOKEN = 'c4absuqad3if7805a640';
  // const BASE_URL = 'https://finnhub.io/api/v1';
  const [isLoading, setIsLoading] = useState(true);
  const [myStocks, setMyStocks] = useState([]);
  // const getStockInfo = (ticker) => {
  //   const quote = `${BASE_URL}/quote?symbol=${ticker}&token=${TOKEN}`;

  //   const getQuote = axios.get(quote);
  //   const getCompanyProfile2 = axios.get(companyProfile2);

  //   return axios
  //     .all([getQuote, getCompanyProfile2])
  //     .then(
  //       axios.spread((...response) => {
  //         const responseQuote = response[0].data;
  //         const responseCompanyProfile2 = response[1].data;

  //         return {
  //           quote: responseQuote,
  //           companyProfile2: responseCompanyProfile2,
  //         };
  //       })
  //     )
  //     .catch((errors) => {
  //       console.log(errors);
  //     });
  // };
  // const onDataChange = (items) => {
  //   let promises = [];
  //   let tempData = [];
  //   items.forEach((item) => {
  //     promises.push(
  //       Finnhub.getQuote(item.data().ticker).then((response) => {
  //         tempData.push({
  //           id: item.id,
  //           data: item.data(),
  //           info: response,
  //         });
  //       })
  //     );
  //   });

  //   Promise.all(promises).then(() => {
  //     setMyStocks(tempData);
  //   });
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   const unsubscribe = Crud.getAll().onSnapshot(onDataChange);
  //   // const timer = setTimeout(() => {
  //   //   setIsLoading(false);
  //   // }, 2500);
  //   return () => {
  //     // clearTimeout(timer);
  //     unsubscribe();
  //   };
  // }, []);
  // console.log(myStocks);

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
      console.log(tempData);

      Promise.all(promises).then(() => {
        setMyStocks(tempData);
        setIsLoading(false);
      });
    });
  };
  useEffect(() => {
    updateStockInfo();
    return () => {
      updateStockInfo();
    };
  }, []);
  // useEffect(() => {
  //   updateStockInfo();
  // }, []);
  // useEffect(() => {
  //   window.addEventListener('mouseup', updateStockInfo);
  //   return () => {
  //     window.removeEventListener('mouseup', updateStockInfo);
  //   };
  // }, []);
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
              {isLoading ? (
                <div className="app__loading-screen">
                  <LinearProgress className={customStyles} />
                  <div class="blockquote-wrapper">
                    <div class="blockquote">
                      <h1>
                        The stock market is a device to transfer money from the
                        impatient to the patient
                      </h1>
                      <h4>&mdash;Warren Buffet</h4>
                    </div>
                  </div>
                </div>
              ) : (
                <Portfolio
                  myStocks={myStocks}
                  updateStockInfo={updateStockInfo}
                />
              )}
              {/* <Watchlist stocksData={stocksData} /> */}
            </Route>
          </main>
        </Switch>
      </Router>
    </>
  );
}
export default App;
