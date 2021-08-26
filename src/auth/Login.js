import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import firebaseApp from '../firebase/firebase';
import { AuthContext } from './Auth.js';
import { LinearProgress, Button, TextField } from '@material-ui/core';
import './_auth.scss';

const customStyles = {
  root: {
    flexGrow: 1,
  },
  colorPrimary: {
    background: '#fff',
  },
};
const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      console.log(email, password);
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="login">
        <LinearProgress className={customStyles} />
        <div class="blockquote-wrapper">
          <div class="blockquote">
            <h1>
              The stock market is a device to transfer money from the impatient
              to the patient
            </h1>
            <h4>&mdash;Warren Buffet</h4>
          </div>
        </div>
        <div className="login__container">
          <h1 style={{ textAlign: 'center' }}>Log in</h1>
          <div className="login__form">
            <form onSubmit={handleLogin} className="login__credentials">
              <TextField name="email" type="email" label="Email" />
              <TextField name="password" type="password" label="Password" />
              <Button
                style={{ alignSelf: 'center' }}
                type="submit"
                variant="outlined"
              >
                Log in
              </Button>
            </form>
            <Link
              style={{ textAlign: 'center', marginTop: '1rem' }}
              exact
              to="/signup"
            >
              <Button style={{}} variant="outlined">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
