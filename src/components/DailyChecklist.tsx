/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './DailyChecklist.global.css';
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
}

const Tasks = ({ day }: Props) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [editing, setEditing] = useState<boolean>(false);

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

  const handleClick = () => {
    setEditing(!editing);
  };

  const handleDelete = (index: number) => {
    noteService.deleteNote(day, index);
    setTasks(noteService.getDay(day));
  };

  if (editing) {
    return (
      <div>
        <button type="submit" onClick={handleClick}>
          edit
        </button>
        {tasks.map((task, index) => (
          <div key={uuidv4()}>
            <Checkbox key={uuidv4()} task={task} />
            <button type="submit" onClick={() => handleDelete(index)}>
              delete
            </button>
          </div>
        ))}
        <form onSubmit={handleNewTask}>
          <input name="task" />
        </form>
      </div>
    );
  }
  return (
    <div>
      <button type="submit" onClick={handleClick}>
        edit
      </button>
      {tasks.map((task) => (
        <Checkbox key={uuidv4()} task={task} />
      ))}
      <form onSubmit={handleNewTask}>
        <input name="task" />
      </form>
    </div>
  );
};

const DailyChecklist = ({ day }: Props) => {
  return (
    <div id="day_module">
      <h2>{day}</h2>
      <Tasks day={day} />
    </div>
  );
};

export default DailyChecklist;
