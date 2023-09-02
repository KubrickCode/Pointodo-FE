import { TaskType } from "../../entities/task.entity";

export const CREATE_TASK_LINK = "/tasks/create";
export const UPDATE_TASK_LINK = "/tasks/update";
export const DELETE_TASK_LINK = (modalTaskId: number) =>
  `/tasks/${modalTaskId}`;
export const GET_TASK_LINK = (
  taskType: TaskType,
  currentPage: number,
  order: string
) =>
  `/tasks?taskType=${taskType}&offset=${currentPage}&limit=${TASK_LIMIT_IN_A_PAGE}&order=${order}`;
export const GET_TASK_TOTAL_PAGE = (taskType: string) =>
  `/tasks/count/${taskType}`;
export const COMPLETE_TASK_LINK = (id: number) => `/tasks/complete/${id}`;
export const CANCLE_TASK_LINK = (id: number) => `/tasks/cancle/${id}`;

export const DAILY_TASK = "매일 작업";
export const DUE_TASK = "기한 작업";
export const FREE_TASK = "무기한 작업";

export const TASK_LIMIT_IN_A_PAGE = 5;
