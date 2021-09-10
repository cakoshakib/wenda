/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import noteService from '../services/notes';
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
  const [changed, setChanged] = useState<boolean>(false);

  const d = new Date();
  const lastSunday = new Date(d.setDate(d.getDate() - d.getDay()));
  const thisDay = new Date(
    lastSunday.setDate(lastSunday.getDate() + days.indexOf(day))
  );

  const handleClick = () => {
    setDeleting(!deleting);
  };

  const onDragEnd = (res: DropResult) => {
    const { destination, source } = res;

    if (
      destination &&
      !(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
    ) {
      const currentTaskOrder = noteService.getDay(day);
      const sourceTask = currentTaskOrder[source.index];
      currentTaskOrder.splice(source.index, 1);
      currentTaskOrder.splice(destination.index, 0, { ...sourceTask });
      noteService.changeOrder(day, currentTaskOrder);
      setChanged(!changed);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id={styles.dayModule}>
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
        <h3 id={styles.dayHeader}>
          {day}
          <span id={styles.dateNum}>{thisDay.getDate()}</span>
        </h3>
        <Tasks day={day} deleting={deleting} changed={changed} />
      </div>
    </DragDropContext>
  );
};

export default DailyChecklist;
