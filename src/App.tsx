import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';
import { AuthProvider } from './auth/Auth';
import Home from './components/Home';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import PrivateRoute from './auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Router>
    </AuthProvider>
  );
}
export default App;
