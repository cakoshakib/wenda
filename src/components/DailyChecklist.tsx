/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './DailyChecklist.global.css';
import { MdExpandMore, MdExpandLess, MdClose } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import noteService from '../services/notes';

interface Checkboxes {
  task: string;
  index: number;
  day: string;
}

const Checkbox = ({ task, index, day }: Checkboxes) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(true);
  const [val, setVal] = useState<string>(task);

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
      {toggle ? (
        <label
          htmlFor={task}
          className="task_text"
          onDoubleClick={() => setToggle(false)}
        >
          {val}
        </label>
      ) : (
        <input
          name="edit_task"
          type="text"
          value={val}
          onChange={(event) => {
            const content = event.target.value;
            noteService.editNote(day, index, content);
            setVal(content);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'Escape') {
              setToggle(true);
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        />
      )}
    </form>
  );
};

interface Props {
  day: string;
  deleting: boolean;
}

const Tasks = ({ day, deleting }: Props) => {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const savedData = noteService.getDay(day) || [];
    setTasks(savedData);
  }, [deleting]);

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

  if (deleting) {
    return (
      <div id="tasks">
        {tasks.map((task, index) => (
          <div key={uuidv4()} id="oneTask">
            <Checkbox key={uuidv4()} task={task} index={index} day={day} />
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
      {tasks.map((task, index) => (
        <div key={uuidv4()} id="oneTask">
          <Checkbox key={uuidv4()} task={task} index={index} day={day} />
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
      <h2>{day}</h2>
      <h3 id="weekday_date">{dayTitle}</h3>
      <Tasks day={day} deleting={deleting} />
    </div>
  );
};

export default DailyChecklist;
