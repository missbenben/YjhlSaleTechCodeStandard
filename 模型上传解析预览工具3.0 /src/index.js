import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware,  } from 'react-router-redux'

const history = createHistory()
const middleware = routerMiddleware(history)


const store = createStore( reducer,composeWithDevTools(applyMiddleware(middleware,thunk,logger)))



ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    , document.getElementById('root'));
registerServiceWorker();
