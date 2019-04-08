import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Route, Switch, Router } from 'react-router-dom';

import reducers from './reducers';
import sagas from './sagas';
import history from './helpers/history';
import Dashboard from './containers/Dashboard';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas)

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </Provider>  
    );
  }
}

export default App;
