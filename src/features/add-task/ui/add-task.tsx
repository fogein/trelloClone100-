import React, { FC, useState } from 'react';
import { BiCheck, BiPlus, BiXCircle } from 'react-icons/bi';
type AddTaskPropsType = {
  onApply?(name: string): void;
  label: string;
};
const AddTask: FC<AddTaskPropsType> = (props) => {
  const { onApply: onCreateTask, label } = props;
  const [editMode, changeEditMode] = useState(false);
  const [taskDescription, changeTaskDescription] = useState<string>();
  function onTextareaChange(text: string) {
    changeTaskDescription(text);
  }
  function onClose() {
    changeTaskDescription('');
    changeEditMode(false);
  }
  function onApply() {
    if (!taskDescription) return;
    onCreateTask?.(taskDescription);
    changeTaskDescription('');
    changeEditMode(false);
  }
  return (
    <div className="w-full">
      {!editMode ? (
        <div
          onClick={changeEditMode.bind(null, true)}
          className="text-white hover:bg-slate-900 py-[10px] rounded-[10px] cursor-pointer justify-center flex items-center gap-[7px]"
        >
          <BiPlus size={19} />
          <span className="text-[14px] ">{label}</span>
        </div>
      ) : (
        <div className="">
          <textarea
            onKeyDown={(key) => key.code === 'Enter' && onApply()}
            value={taskDescription}
            onChange={(event) => onTextareaChange(event.target.value)}
            className="bg-taskColor/[.7] px-[10px] w-full focus:outline-0 text-white border-none rounded-[10px]"
          />
          <div className="flex items-center justify-around text-white">
            <BiXCircle
              onClick={onClose}
              className="cursor-pointer hover:bg-white/[.1] rounded-full p-1"
              size={30}
            />
            <BiCheck
              onClick={onApply}
              className="cursor-pointer hover:bg-white/[.1] rounded-full p-1"
              size={30}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
