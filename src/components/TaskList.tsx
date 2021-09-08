import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Task from './Task';
import styles from '../styles/TaskList.css';
import noteService from '../services/notes';

interface TaskList {
  day: string;
  deleting: boolean;
}

const Tasks = ({ day, deleting }: TaskList) => {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const savedData = noteService.getDay(day) || [];
    const contents: string[] = savedData.map((x) => x.content);
    setTasks(contents);
  }, [day, deleting]);

  const handleNewTask = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = event.target.task.value;
    event.target.task.value = '';
    noteService.addNote(day, content);

    setTasks(noteService.getDay(day).map((x) => x.content));
  };

  const handleDelete = (index: number) => {
    noteService.deleteNote(day, index);
    setTasks(noteService.getDay(day).map((x) => x.content));
  };

  if (deleting) {
    return (
      <div id={styles.tasks}>
        {tasks.map((task, index) => (
          <div key={uuidv4()} id={styles.oneTask}>
            <Task
              key={uuidv4()}
              task={task}
              index={index}
              day={day}
              d
              handleDelete={handleDelete}
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
    <div id={styles.tasks}>
      {tasks.map((task, index) => (
        <div key={uuidv4()} id={styles.oneTask}>
          <Task
            key={uuidv4()}
            task={task}
            index={index}
            day={day}
            d={false}
            handleDelete={handleDelete}
          />
        </div>
      ))}
      <form onSubmit={handleNewTask}>
        <input name="task" />
      </form>
    </div>
  );
};

export default Tasks;
