import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import Nav from './components/Nav/Nav';
import Newsfeed from './components/Newsfeed/Newsfeed';
import Lists from './components/Lists/Lists';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="app__header">
          <Nav />
        </header>
        <Switch>
          <main className="app__body">
            <div className="app__container">
              <Route exact path="/" component={Newsfeed}>
                <Newsfeed />
                <Lists />
              </Route>
            </div>
          </main>
        </Switch>
      </Router>
    </div>
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
