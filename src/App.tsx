import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Week from './components/Week';

export default function App() {
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route path="/">
            <Week />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
