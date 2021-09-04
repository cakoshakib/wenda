import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdClose } from 'react-icons/md';
import './Tasks.global.css';
import noteService from '../services/notes';
import Checkbox from './Checkbox';

interface TaskList {
  day: string;
  deleting: boolean;
}

const Tasks = ({ day, deleting }: TaskList) => {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const savedData = noteService.getDay(day) || [];
    setTasks(savedData);
  }, [day, deleting]);

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

export default Tasks;
