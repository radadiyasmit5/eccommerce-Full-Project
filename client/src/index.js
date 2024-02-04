import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import "antd/dist/antd.css"
import {BrowserRouter} from "react-router-dom"
// import * as serviceWorker from "./serviceWorker";
import {applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from "./reducers"
import CardContextProvider from "./componant/context/CardContextProvider"
import {thunk} from 'redux-thunk';
//store

const store = createStore(
  rootReducer,
  composeWithDevTools( applyMiddleware(thunk))
 
)
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CardContextProvider>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </CardContextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

// serviceWorker.unregister();
