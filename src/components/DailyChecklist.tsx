/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './DailyChecklist.global.css';
import { v4 as uuidv4 } from 'uuid';
import Store from 'electron-store';

const store = new Store();

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const savedData = (store.get(day) as string[]) || [];
    setTasks(savedData);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNewTask = (event: any) => {
    event.preventDefault();
    const content = event.target.task.value;
    event.target.task.value = '';
    let dayArr: string[] = store.get(day) as string[];
    if (!dayArr) {
      store.set(day, []);
      dayArr = store.get(day) as string[];
    }
    const updated = dayArr.concat(content);
    store.set(day, updated);

    setTasks([...tasks, content]);
  };
  const handleClick = () => {
    setEditing(!editing);
  };
  const handleDelete = (index: number) => {
    const dayArr: string[] = store.get(day) as string[];
    dayArr.splice(index, 1);
    store.set(day, dayArr);
    setTasks(dayArr);
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
