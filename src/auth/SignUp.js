import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import firebaseApp from '../firebase/firebase';
import { db } from '../firebase/firebase';
import { Button, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './_auth.scss';
import ReactPlayer from 'react-player';
import demoVideo from '../assets/videos/stock-portfolio-app-demo.mp4';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((response) => {
            const { uid, email } = response.user;
            db.collection('users').doc(uid).set({ uid, email });
          });
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="signup">
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp} className="signup__form">
        <TextField name="email" type="email" label="Email" />
        <TextField name="password" type="password" label="Password" />
        <Button type="submit" variant="outlined">
          Sign Up
        </Button>
        <Alert severity="warning">
          Currently not accepting any new account
        </Alert>
      </form>
      <div className="demo-video">
        <ReactPlayer
          url={demoVideo}
          controls={true}
          muted={true}
          playing={true}
          loop={true}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default withRouter(SignUp);
