import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import Reducers from './reducers';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import './index.css';

const reducers = combineReducers(Reducers);
const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
