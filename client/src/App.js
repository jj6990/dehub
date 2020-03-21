import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Feed from './components/pages/Feed';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import Portfolio from './components/pages/Portfolio';
import './App.css';
import './cards.css';

import PostState from './context/post/PostState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <PostState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Feed} />
                  <PrivateRoute exact path='/Portfolio' component={Portfolio} />
                  <Route exact path='/About' component={About} />
                  <Route exact path='/Register' component={Register} />
                  <Route exact path='/Login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </PostState>
    </AuthState>
  );
};

export default App;
