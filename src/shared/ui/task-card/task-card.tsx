import React, { FC, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
type TaskCardPropsType = {
  text: string;
  onTrashIconClick(): void;
};
const TaskCard: FC<TaskCardPropsType> = (props) => {
  const [hovered, changeHoveredState] = useState(false);
  return (
    <div
      onMouseEnter={() => changeHoveredState(true)}
      onMouseLeave={() => changeHoveredState(false)}
      className="relative flex items-center p-[2px]"
    >
      <div className="transition-all   hover:ring-solid hover:ring-[2px] hover:ring-white w-full h-full break-all rounded-[8px] bg-taskColor/[.7] p-[10px_20px_10px_10px] text-[14px] text-white">
        {props.text}
      </div>
      {hovered && (
        <div
          onClick={props.onTrashIconClick}
          className="text-red-700 hover:text-red-800 p-[4px] absolute right-0 top-0 cursor-pointer"
        >
          <BiTrash size={16} />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
