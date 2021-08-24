import React from 'react';
import DailyChecklist from './DailyChecklist';
import './Week.global.css';

const Week = () => {
  const d = new Date();
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
  const weekTitle = `Week of Sunday ${new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(lastSunday)} ${lastSunday.getDate()}, ${lastSunday.getFullYear()}`;

  return (
    <div>
      <h1 id="week_title">{weekTitle}</h1>
      <div id="days_container">
        <DailyChecklist day="Monday" />
        <DailyChecklist day="Tuesday" />
        <DailyChecklist day="Wednesday" />
        <DailyChecklist day="Thursday" />
        <DailyChecklist day="Friday" />
        <DailyChecklist day="Saturday" />
        <DailyChecklist day="Sunday" />
      </div>
    </div>
  );
};

export default Week;
