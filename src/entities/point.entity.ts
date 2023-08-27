export interface PointLog {
  id: number;
  userId: string;
  points: number;
  occuredAt: string;
  taskId?: number;
  taskName?: string;
  badgeId?: number;
  badgeName?: string;
}
