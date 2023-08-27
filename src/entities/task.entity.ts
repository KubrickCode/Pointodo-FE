export interface TaskEntity {
  id: number;
  userId: string;
  taskType: string;
  name: string;
  description: string;
  completion: number;
  importance: number;
  occurredAt: string;
  version: number;
  dueDate?: string;
}

export enum TaskType {
  DAILY = "DAILY",
  DUE = "DUE",
  FREE = "FREE",
}
