import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import Apple from './components/apple';
import appleStore from './stores/appleStore'

ReactDOM.render(
  <Provider appleStore={appleStore}>
    <Apple />
  </Provider>,
  document.getElementById('root')
);
