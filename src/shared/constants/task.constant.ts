import { TaskType } from "../../entities/task.entity";

export const CREATE_TASK_LINK = "/task/create";
export const UPDATE_TASK_LINK = "/task/update";
export const DELETE_TASK_LINK = (modalTaskId: number) => `/task/${modalTaskId}`;
export const GET_TASK_LINK = (
  taskType: TaskType,
  currentPage: number,
  order: string
) => `/task?taskType=${taskType}&page=${currentPage}&order=${order}`;
export const GET_TASK_TOTAL_PAGE = (taskType: string) =>
  `/task/count/${taskType}`;
export const COMPLETE_TASK_LINK = (id: number) => `/task/complete/${id}`;
export const CANCLE_TASK_LINK = (id: number) => `/task/cancle/${id}`;

export const DAILY_TASK = "매일 작업";
export const DUE_TASK = "기한 작업";
export const FREE_TASK = "무기한 작업";
