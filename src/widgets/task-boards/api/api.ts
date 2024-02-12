import { BASE_URL } from '@shared/utils/config';
import axios from 'axios';
import { BoardType } from '@widgets/task-boards/model/types';

export function getBoardApis() {
  async function getBoards() {
    if (!BASE_URL) return;
    const response = axios.get<BoardType[]>(BASE_URL);
    return await response;
  }
  async function createBoard(board: BoardType) {
    if (!BASE_URL) return;
    const response = axios.post<BoardType[]>(BASE_URL, board);
    return await response;
  }
  async function updateBoard(updatedBoard: BoardType, id: string) {
    if (!BASE_URL) return;
    const response = axios.put(`${BASE_URL}/${id}`, { ...updatedBoard });
    return await response;
  }
  async function deleteBoard(id: string) {
    if (!BASE_URL) return;
    const response = axios.delete(`${BASE_URL}/${id}`);
    return await response;
  }
  return { getBoards, createBoard, updateBoard, deleteBoard };
}
