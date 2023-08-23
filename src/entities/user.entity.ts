export interface UserEntity {
  id: string;
  selectedBadgeId: number;
  email: string;
  provider: string;
  role: string;
  createdAt: Date;
}
