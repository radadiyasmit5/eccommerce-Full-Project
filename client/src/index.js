import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
// import * as serviceWorker from "./serviceWorker";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redusers'


//store

const store=createStore(rootReducer,composeWithDevTools())
ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <App />
       {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
 ,
  document.getElementById('root')
);


// serviceWorker.unregister();