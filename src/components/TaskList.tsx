/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';
import styles from '../styles/TaskList.css';
import noteService from '../services/notes';

interface TaskList {
  day: string;
  deleting: boolean;
  changed: boolean;
}

const Tasks = ({ day, deleting, changed }: TaskList) => {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const savedData = noteService.getDay(day) || [];
    const contents: string[] = savedData.map((x) => x.content);
    setTasks(contents);
  }, [day, deleting, changed]);

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

  const TaskList = styled.div``;

  return (
    <>
      <Droppable droppableId="hello">
        {(provided) => (
          <TaskList
            id={styles.tasks}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <div key={uuidv4()} id={styles.oneTask}>
                <Task
                  key={uuidv4()}
                  task={task}
                  index={index}
                  day={day}
                  d={deleting}
                  handleDelete={handleDelete}
                />
              </div>
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <form onSubmit={handleNewTask}>
        <input name="task" />
      </form>
    </>
  );
};

export default Tasks;
