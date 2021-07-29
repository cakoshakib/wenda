import React, { useState } from 'react';
import './DailyChecklist.css';

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

const Tasks = () => {
  const [tasks, addTask] = useState<string[]>([]);
  const handleNewTask = (event: any) => {
    event.preventDefault();
    const content = event.target.task.value;
    event.target.task.value = '';
    addTask([...tasks, content]);
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

interface Props {
  day: string;
}

const DailyChecklist = ({ day }: Props) => {
  return (
    <div id="day_module">
      <h2>{day}</h2>
      <Tasks />
    </div>
  );
};

export default DailyChecklist;
