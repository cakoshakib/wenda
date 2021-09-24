import React, { useState, useEffect } from 'react';
import DailyChecklist from './DailyChecklist';
import styles from '../styles/Week.css';
import noteService from '../services/notes';

const Week = () => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const lastSunday = new Date(
    currentDay.setDate(currentDay.getDate() - currentDay.getDay() + 1)
  );
  const weekTitle = `Week of ${new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(lastSunday)} ${lastSunday.getDate()}, ${lastSunday.getFullYear()}`;

  const [fakeReload, setFakeReload] = useState<boolean>(false);

  useEffect(() => {
    noteService.setWeek(weekTitle);
  }, [weekTitle]);

  if (fakeReload) {
    setTimeout(() => setFakeReload(false), 1);
    return (
      <div>
        <h1 id={styles.weekTitle}>{weekTitle}</h1>
      </div>
    );
  }

  const handleUpdateWeek = (num: number) => {
    currentDay.setDate(currentDay.getDate() + 7 * num);
    setCurrentDay(currentDay);

    noteService.setWeek(weekTitle);
    setFakeReload(true);
  };

  const handleReset = () => {
    setCurrentDay(new Date());
    setFakeReload(true);
  };

  return (
    <div>
      <div id={styles.weekTitle}>
        <span
          role="button"
          onClick={() => handleUpdateWeek(-1)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'Enter')
              handleUpdateWeek(-1);
          }}
          className={styles.arrowButtons}
        >
          ←
        </span>
        {weekTitle}
        <span
          role="button"
          onClick={() => handleUpdateWeek(1)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'Enter')
              handleUpdateWeek(1);
          }}
          className={styles.arrowButtons}
        >
          →
        </span>
      </div>
      <div id={styles.archiveButton}>
        <button
          type="button"
          onClick={handleReset}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'Enter') handleReset();
          }}
        >
          Reset
        </button>
      </div>
      <div id={styles.daysContainer}>
        <DailyChecklist day="Monday" lastSunday={lastSunday} />
        <DailyChecklist day="Tuesday" lastSunday={lastSunday} />
        <DailyChecklist day="Wednesday" lastSunday={lastSunday} />
        <DailyChecklist day="Thursday" lastSunday={lastSunday} />
        <DailyChecklist day="Friday" lastSunday={lastSunday} />
        <DailyChecklist day="Saturday" lastSunday={lastSunday} />
        <DailyChecklist day="Sunday" lastSunday={lastSunday} />
      </div>
    </div>
  );
};

export default Week;
