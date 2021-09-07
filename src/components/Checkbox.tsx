import React, { useEffect, useState } from 'react';
import noteService from '../services/notes';
import styles from '../styles/Checkbox.css';

interface Checkboxes {
  task: string;
  index: number;
  day: string;
}

const Checkbox = ({ task, index, day }: Checkboxes) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(true);
  const [val, setVal] = useState<string>(task);

  useEffect(() => {
    const savedData = noteService.getDay(day) || [];
    const state = savedData[index].checked;
    setIsChecked(state);
  }, [day, index]);

  const handleOnChange = () => {
    noteService.toggleChecked(day, index);
    setIsChecked(!isChecked);
  };

  return (
    <form>
      <input
        id={task}
        type="checkbox"
        checked={isChecked}
        onChange={handleOnChange}
      />
      {toggle ? (
        <label
          htmlFor={task}
          id={styles.task_text}
          onDoubleClick={() => setToggle(false)}
        >
          {val}
        </label>
      ) : (
        <input
          name={styles.edit_task}
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

export default Checkbox;
