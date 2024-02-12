import React, { FC, useState } from 'react';
import { TaskCard } from '@shared/ui';
import { AddTask } from '@features/add-task/ui';
import { getBoardApis } from '@widgets/task-boards/api/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BoardType, TaskType } from '@widgets/task-boards/model/types';
import { v4 } from 'uuid';
import { BiTrash } from 'react-icons/bi';
const TaskBoards: FC = () => {
  const { getBoards, updateBoard, createBoard, deleteBoard } = getBoardApis();
  const queryClient = useQueryClient();
  const { data: boards } = useQuery('boards', () => getBoards(), { keepPreviousData: true });
  const updateBoardMutation = useMutation(
    ({ updatedBoard, id }: { updatedBoard: BoardType; id: string }) =>
      updateBoard(updatedBoard, id),
    { onSuccess: () => queryClient.invalidateQueries(['boards']) },
  );
  const createBoardMutation = useMutation(
    ({ updatedBoard }: { updatedBoard: BoardType }) => createBoard(updatedBoard),
    { onSuccess: () => queryClient.invalidateQueries(['boards']) },
  );
  const deleteBoardMutation = useMutation(({ id }: { id: string }) => deleteBoard(id), {
    onSuccess: () => queryClient.invalidateQueries(['boards']),
  });
  function onDeleteTaskHandler(boardId: string, taskId: string) {
    const selectedBoard = boards?.data.find((board) => board.id === boardId);
    if (!selectedBoard || !taskId) return;
    updateBoardMutation.mutate({
      updatedBoard: {
        ...selectedBoard,
        tasks: selectedBoard.tasks.filter((task) => task.id !== taskId),
      },
      id: boardId,
    });
  }
  function onDeleteBoardHandler(id: string) {
    if (!id) return;
    deleteBoardMutation.mutate({ id });
  }
  function onAddTaskHandler(name: string, boardId: string) {
    const selectedBoard = boards?.data.find((board) => board.id === boardId);
    if (!selectedBoard) return;
    updateBoardMutation.mutate({
      updatedBoard: {
        ...selectedBoard,
        tasks: [
          ...selectedBoard.tasks,
          { text: name, order: selectedBoard.tasks.length, id: v4() },
        ],
      },
      id: boardId,
    });
  }
  function onAddBoardHandler(name: string) {
    if (!name) return;
    createBoardMutation.mutate({ updatedBoard: { name, tasks: [], id: v4() } });
  }
  //drag
  const [currentTask, setCurrentTask] = useState<TaskType>();
  const [currentBoard, setCurrentBoard] = useState<BoardType>();

  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    task: TaskType,
    board: BoardType,
  ) => {
    setCurrentTask(task);
    setCurrentBoard(board);
  };

  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.background = '';
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.style.background = '#D4D4D4';
  };

  const dropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    board: BoardType,
    task?: TaskType,
  ) => {
    event.preventDefault();
    event.currentTarget.style.background = '';
    if (!currentTask || !currentBoard || !boards?.data) return;
    let boardsList = [...boards.data];
    if (board.id === currentBoard?.id) {
      boardsList = boardsList.map((prevBoards) => {
        if (prevBoards.id === board.id) {
          const maxAvailableOrder = Math.max(...prevBoards.tasks.map((i) => i.order));
          return {
            ...prevBoards,
            tasks: prevBoards.tasks.map((prevTask) => {
              if (!task) {
                if (prevTask.id === currentTask.id) {
                  return {
                    ...prevTask,
                    order: maxAvailableOrder,
                  };
                } else if (prevTask.order >= currentTask.order) {
                  return { ...prevTask, order: prevTask.order - 1 };
                }
              } else {
                if (prevTask.id === currentTask.id) {
                  return {
                    ...prevTask,
                    order: task.order,
                  };
                } else if (task.id === prevTask.id) {
                  return { ...prevTask, order: currentTask.order };
                }
              }
              return prevTask;
            }),
          };
        }
        return prevBoards;
      });
    } else {
      boardsList = boardsList.map((prevBoard) => {
        if (prevBoard.id === currentBoard.id) {
          return {
            ...prevBoard,
            tasks: prevBoard.tasks.filter((prevTasks) => prevTasks.id !== currentTask.id),
          };
        } else if (prevBoard.id === board.id) {
          const maxOrder = Math.max(...prevBoard.tasks.map((i) => i.order));
          const newTasks = [...prevBoard.tasks, { ...currentTask, order: maxOrder + 1 }];
          return {
            ...prevBoard,
            tasks: newTasks,
          };
        }
        return prevBoard;
      });
    }
    for (const board of boardsList) {
      updateBoardMutation.mutate({
        updatedBoard: board,
        id: board.id,
      });
    }
  };
  //drag
  return (
    <div className="flex h-full items-center ">
      <div className="flex gap-[20px] pr-[40px]">
        {boards?.data.map((board) => (
          <div
            key={board.id}
            className="bg-slate-800 w-[250px] rounded-[12px] p-[10px] h-full flex flex-col gap-[10px]"
          >
            <div className="flex justify-between items-center">
              <div className="h-[40px] w-[calc(100%-30px)] flex items-center ">
                <span className="uppercase truncate text-white text-[14px]">{board.name}</span>
              </div>
              <div
                onClick={() => onDeleteBoardHandler(board.id)}
                className="text-red-700 cursor-pointer"
              >
                <BiTrash size={18} />
              </div>
            </div>

            <div className="w-full  flex flex-col gap-[7px] overflow-y-auto max-h-[300px]">
              {board.tasks
                .sort((a, b) => a.order - b.order)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => dragStartHandler(e, task, board)}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, board, task)}
                    className="relative z-10"
                  >
                    <TaskCard
                      onTrashIconClick={() => onDeleteTaskHandler(board.id, task.id)}
                      text={task.text}
                    />
                  </div>
                ))}
              <div
                onDragLeave={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, board)}
                className="h-[40px]"
              ></div>
            </div>

            <AddTask label="Добавить таск" onApply={(name) => onAddTaskHandler(name, board.id)} />
          </div>
        ))}
        <div className="w-[250px] bg-slate-800 h-fit rounded-[10px] p-2">
          <AddTask label="Добавить доску" onApply={(name) => onAddBoardHandler(name)} />
        </div>
      </div>
    </div>
  );
};
export default TaskBoards;
