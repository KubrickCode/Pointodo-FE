export interface UserEntity {
  id: string;
  email: string;
  provider: Provider;
  role: Role;
  selectedBadgeId: number;
  selectedBadge?: { iconLink: string };
  createdAt: Date;
}

export interface UserBadgeProgressEntity {
  id: number;
  userId: string;
  badgeId: number;
  progress: number;
  occurredAt: Date;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MASTER = "MASTER",
}

export enum Provider {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE",
  KAKAO = "KAKAO",
}
