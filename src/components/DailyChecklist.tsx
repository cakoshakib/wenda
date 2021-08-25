/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './DailyChecklist.global.css';
import { MdExpandMore, MdExpandLess, MdClose } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import noteService from '../services/notes';

const Checkbox = ({ task }: { task: string }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <form className="task_item">
      <input
        id={task}
        type="checkbox"
        checked={isChecked}
        onChange={handleOnChange}
      />
      <label htmlFor={task} className="task_text">
        {task}
      </label>
    </form>
  );
};

interface Props {
  day: string;
  editing: boolean;
}

const Tasks = ({ day, editing }: Props) => {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const savedData = noteService.getDay(day) || [];
    setTasks(savedData);
  }, []);

  const handleNewTask = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = event.target.task.value;
    event.target.task.value = '';
    noteService.addNote(day, content);

    setTasks(noteService.getDay(day));
  };

  const handleDelete = (index: number) => {
    noteService.deleteNote(day, index);
    setTasks(noteService.getDay(day));
  };

  if (editing) {
    return (
      <div id="tasks">
        {tasks.map((task, index) => (
          <div key={uuidv4()} id="editing">
            <Checkbox key={uuidv4()} task={task} />
            <MdClose
              size="35"
              id="delete"
              onClick={() => handleDelete(index)}
            />
          </div>
        ))}
        <form onSubmit={handleNewTask}>
          <input name="task" />
        </form>
      </div>
    );
  }
  return (
    <div id="tasks">
      {tasks.map((task) => (
        <div key={uuidv4()} id="editing">
          <Checkbox key={uuidv4()} task={task} />
        </div>
      ))}
      <form onSubmit={handleNewTask}>
        <input name="task" />
      </form>
    </div>
  );
};

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
  const [editing, setEditing] = useState<boolean>(false);

  const d = new Date();
  const lastSunday = new Date(d.setDate(d.getDate() - d.getDay()));
  const thisDay = new Date(
    lastSunday.setDate(lastSunday.getDate() + days.indexOf(day))
  );
  const dayTitle = `${new Intl.DateTimeFormat('en-US', {
    month: 'short',
  }).format(thisDay)}. ${thisDay.getDate()}`;

  const handleClick = () => {
    setEditing(!editing);
  };

  return (
    <div id="day_module">
      {editing ? (
        <MdExpandLess size="50" id="more" onClick={handleClick} />
      ) : (
        <MdExpandMore size="50" id="more" onClick={handleClick} />
      )}
      <h2>{day}</h2>
      <h3 id="weekday_date">{dayTitle}</h3>
      <Tasks day={day} editing={editing} />
    </div>
  );
};

export default DailyChecklist;
