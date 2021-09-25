/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import Tasks from './TaskList';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

interface Checklist {
  day: string;
  lastSunday: Date;
}

const DailyChecklist = ({ day, lastSunday }: Checklist) => {
  const [deleting, setDeleting] = useState<boolean>(false);

  const thisDay = new Date(
    lastSunday.setDate(lastSunday.getDate() + days.indexOf(day))
  );

  const handleClick = () => {
    setDeleting(!deleting);
  };

  return (
    <div id="dayModule">
      {deleting ? (
        <MdExpandLess size="50" id="expandButton" onClick={handleClick} />
      ) : (
        <MdExpandMore size="50" id="expandButton" onClick={handleClick} />
      )}
      <h3 id="dayHeader">
        {day}
        <span id="dateNum">{thisDay.getDate()}</span>
      </h3>
      <Tasks day={day} deleting={deleting} />
    </div>
  );
};

export default DailyChecklist;
