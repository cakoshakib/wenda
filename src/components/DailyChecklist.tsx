/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import './DailyChecklist.global.css';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import Tasks from './Tasks';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface Checklist {
  day: string;
}

const DailyChecklist = ({ day }: Checklist) => {
  const [deleting, setDeleting] = useState<boolean>(false);

  const d = new Date();
  const lastSunday = new Date(d.setDate(d.getDate() - d.getDay()));
  const thisDay = new Date(
    lastSunday.setDate(lastSunday.getDate() + days.indexOf(day))
  );
  const dayTitle = `${new Intl.DateTimeFormat('en-US', {
    month: 'short',
  }).format(thisDay)}. ${thisDay.getDate()}`;

  const handleClick = () => {
    setDeleting(!deleting);
  };

  return (
    <div id="day_module">
      {deleting ? (
        <MdExpandLess size="50" id="expandButton" onClick={handleClick} />
      ) : (
        <MdExpandMore size="50" id="expandButton" onClick={handleClick} />
      )}
      <h3 id="day_header">
        {day}
        <span id="date_num">{thisDay.getDate()}</span>
      </h3>
      <Tasks day={day} deleting={deleting} />
    </div>
  );
};

export default DailyChecklist;
