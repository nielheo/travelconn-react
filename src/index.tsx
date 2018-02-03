import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

import './index.css';

const store = createStore<StoreState>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
});

import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter children={routes} />
    </Provider>, 
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
