import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

import store from './redux/store';
import { Provider } from 'react-redux';



const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>
);