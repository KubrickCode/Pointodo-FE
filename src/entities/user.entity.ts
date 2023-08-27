export interface UserEntity {
  id: string;
  selectedBadgeId: number;
  email: string;
  provider: string;
  role: string;
  createdAt: Date;
}

export interface UserBadgeProgressEntity {
  id: number;
  userId: string;
  badgeId: number;
  progress: number;
  occurredAt: Date;
}
