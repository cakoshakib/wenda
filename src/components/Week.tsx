import React from 'react';
import DailyChecklist from './DailyChecklist';
import './Week.global.css';

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

export default Week;
