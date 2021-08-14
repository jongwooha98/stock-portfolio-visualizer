import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import TopNav from './components/Nav/TopNav';
import BottomNav from './components/Nav/BottomNav';
import Newsfeed from './components/Newsfeed/Newsfeed';
import Portfolio from './components/Portfolio/Portfolio';
import Lists from './components/Lists/Lists';
import './App.scss';

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
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
              <Portfolio />
              <Lists />
            </Route>
          </main>
        </Switch>
      </Router>
    </>
  );
}
export default App;
{
  /* <div className="App">
     
      <div className="app__header">
        <Nav />
      </div>
   
      <div className="app__body">
        <div className="app__container">
          <Newsfeed />
          <Lists />
        </div>
      </div>
  </div> */
}

{
  /* <>
<Router>
  <header className="header" id="header">
    <Nav />
  </header>
  <Switch>
    <main className="main">
      <Route exact path="/" component={Home}>
        <Home />
        <About />
        <Skills />
        <Qualification />
        <Portfolio />
        <Contact />
      </Route>
      <Route exact path="/projects" component={Projects} />
    </main>
  </Switch>
  <Link to="#" className="scroll-up" id="scroll-up">
    <i className="uil uil-arrow-up scroll-up__icon" />
  </Link>
  <footer className="footer">
    <Footer />
  </footer>
</Router>
</> */
}
