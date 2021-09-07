import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import noteService from '../services/notes';

interface Checkboxes {
  task: string;
  index: number;
  day: string;
  d: boolean;
  handleDelete: (a: number) => void;
}

const Checkbox = ({ task, index, day, d, handleDelete }: Checkboxes) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(true);
  const [val, setVal] = useState<string>(task);

  useEffect(() => {
    const savedData = noteService.getDay(day) || [];
    const state = savedData[index].checked;
    setIsChecked(state);
  }, [day, index]);

  const strikeThrough = {
    textDecoration: 'none',
    color: 'white',
  };

  const handleOnChange = () => {
    noteService.toggleChecked(day, index);
    setIsChecked(!isChecked);
  };

  const dStyle = {
    display: 'none',
  } as React.CSSProperties;

  if (d) {
    dStyle.display = 'inline-block';
  }

  if (isChecked) {
    strikeThrough.textDecoration = 'line-through';
    strikeThrough.color = 'gray';
  } else {
    strikeThrough.textDecoration = 'none';
    strikeThrough.color = 'white';
  }

  return (
    <form className="task_item">
      <table>
        <tr>
          <td id="checkboxTd">
            <input
              id={task}
              type="checkbox"
              checked={isChecked}
              onChange={handleOnChange}
            />
          </td>
          <td id="taskTd">
            {toggle ? (
              <label
                htmlFor={task}
                className="task_text"
                onDoubleClick={() => setToggle(false)}
                style={strikeThrough}
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
          </td>
          <td id="deleteTd" style={dStyle}>
            <MdClose
              size="35"
              id="delete"
              onClick={() => handleDelete(index)}
            />
          </td>
        </tr>
      </table>
    </form>
  );
};

export default Checkbox;
