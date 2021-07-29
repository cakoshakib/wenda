import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import DailyChecklist from './components/DailyChecklist';

const Heading = () => {
  return <h1 id="header">Wenda</h1>;
};

const Week = () => {
  return (
    <div id="week_container">
      <DailyChecklist day="Monday" />
      <DailyChecklist day="Tuesday" />
      <DailyChecklist day="Wednesday" />
      <DailyChecklist day="Thursday" />
      <DailyChecklist day="Friday" />
      <DailyChecklist day="Saturday" />
      <DailyChecklist day="Sunday" />
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Heading />
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
