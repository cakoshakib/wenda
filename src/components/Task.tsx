import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import noteService from '../services/notes';

interface TaskProps {
  task: string;
  index: number;
  day: string;
  d: boolean;
  handleDelete: (a: number) => void;
}

const TaskInfo = ({
  strikeThrough,
  task,
  day,
  index,
}: {
  strikeThrough: React.CSSProperties;
  task: string;
  day: string;
  index: number;
}) => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [val, setVal] = useState<string>(task);

  return (
    <td id="taskTd">
      {toggle ? (
        <label
          htmlFor={task}
          className="taskText"
          onDoubleClick={() => setToggle(false)}
          style={strikeThrough}
        >
          {val}
        </label>
      ) : (
        <input
          name="edit_task"
          type="text"
          className="editTask"
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
  );
};

const DeleteButton = ({
  handleDelete,
  index,
  dStyle,
}: {
  handleDelete: (a: number) => void;
  index: number;
  dStyle: React.CSSProperties;
}) => (
  <td id="deleteTd" style={dStyle}>
    <MdClose size="35" id="deleteButton" onClick={() => handleDelete(index)} />
  </td>
);

const Task = ({ task, index, day, d, handleDelete }: TaskProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

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
        <tr
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleOnChange();
            }
          }}
          id="taskRow"
        >
          <td id="checkboxTd">
            <input
              id={task}
              type="checkbox"
              checked={isChecked}
              onChange={handleOnChange}
            />
          </td>
          <TaskInfo
            strikeThrough={strikeThrough}
            task={task}
            day={day}
            index={index}
          />
          <DeleteButton
            handleDelete={handleDelete}
            index={index}
            dStyle={dStyle}
          />
        </tr>
      </table>
    </form>
  );
};

export default Task;
