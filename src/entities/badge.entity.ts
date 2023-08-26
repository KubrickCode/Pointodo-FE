export interface BadgeEntity {
  id: number;
  name: string;
  description: string;
  iconLink: string;
  price: number | null;
  type: BadgeType;
}

export interface UserBadgeListWithName {
  badgeId: number;
  name: string;
}

export enum BadgeType {
  NORMAL = "NORMAL",
  ACHIEVEMENT = "ACHIEVEMENT",
  SPECIAL = "SPECIAL",
}
