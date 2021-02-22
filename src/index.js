import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './Store/reducers/rootReducer';
import { loadState, saveState } from './Store/localStorage';
import throttle from 'lodash.throttle'

// const persistedState = loadState()

const store = createStore(rootReducer, applyMiddleware(thunk));
// console.log(store.getState().product)

store.subscribe(throttle(() => {
  saveState({
    product: store.getState().product,
    // auth: store.getState().auth,
    category: store.getState().category,
    cart: store.getState().cart,
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
