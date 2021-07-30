import React, { useState, useEffect } from 'react';
import './DailyChecklist.global.css';

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
  const [tasks, addTask] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const savedData = JSON.parse(window.localStorage.getItem(day)) || [];
    addTask(savedData);
  }, []);

  const handleNewTask = (event: any) => {
    event.preventDefault();
    const content = event.target.task.value;
    event.target.task.value = '';
    addTask([...tasks, content]);

    window.localStorage.setItem(day, JSON.stringify([...tasks, content]));
  };

  return (
    <div>
      {tasks.map((task) => (
        <Checkbox key={task} task={task} />
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
