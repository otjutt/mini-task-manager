import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import history from "./history";
import './index.scss';
import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware
} from 'connected-react-router';

/* Components */
import PageHome from "./PageHome/PageHome";
import Page404 from "./Page404/Page404";

/* Reducers */
import { reducers as PageHomeReducer } from "./PageHome/Store";

/* Create store. */
const store = createStore(
    combineReducers({
        router: connectRouter(history),
        PageHome: PageHomeReducer
    }),
    applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" key="home" component={PageHome} strict exact/>,

                    <Route key="404" component={Page404} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
