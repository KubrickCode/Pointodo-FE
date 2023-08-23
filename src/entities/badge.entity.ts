export interface BadgeEntity {
  id: number;
  name: string;
  description: string;
  iconLink: string;
  price: number | null;
  type: BadgeType;
}

export enum BadgeType {
  NORMAL,
  ACHIEVEMENT,
  SPECIAL,
}
