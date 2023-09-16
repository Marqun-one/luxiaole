import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './views/HomePage';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <HomePage></HomePage>
      </BrowserRouter>
      </Provider>
  );
}

export default App;
