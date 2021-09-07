import React, { useState } from 'react';
import DailyChecklist from './DailyChecklist';
import styles from '../styles/Week.css';
import noteService from '../services/notes';

const Week = () => {
  const d = new Date();
  const lastSunday = new Date(d.setDate(d.getDate() - d.getDay()));
  const weekTitle = `Week of ${new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(lastSunday)} ${lastSunday.getDate()}, ${lastSunday.getFullYear()}`;
  const [fakeReload, setFakeReload] = useState<boolean>(false);

  const handleArchive = () => {
    noteService.archiveNotes(weekTitle);
    setFakeReload(true);
  };

  if (fakeReload) {
    setTimeout(() => setFakeReload(false), 100);
    return (
      <div>
        <h1 id={styles.week_title}>{weekTitle}</h1>
        <div id={styles.archive_button}>
          <button type="button" onClick={handleArchive}>
            Archive
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 id={styles.week_title}>{weekTitle}</h1>
      <div id={styles.archive_button}>
        <button type="button" onClick={handleArchive}>
          Archive
        </button>
      </div>
      <div id={styles.days_container}>
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
