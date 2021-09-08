/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import styles from '../styles/DailyChecklist.css';
import Tasks from './TaskList';

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

  const handleClick = () => {
    setDeleting(!deleting);
  };

  return (
    <div id={styles.day_module}>
      {deleting ? (
        <MdExpandLess
          size="50"
          id={styles.expandButton}
          onClick={handleClick}
        />
      ) : (
        <MdExpandMore
          size="50"
          id={styles.expandButton}
          onClick={handleClick}
        />
      )}
      <h3 id={styles.day_header}>
        {day}
        <span id={styles.date_num}>{thisDay.getDate()}</span>
      </h3>
      <Tasks day={day} deleting={deleting} />
    </div>
  );
};

export default DailyChecklist;
