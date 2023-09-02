export const UPLOAD_BADGE_LINK = "/admin/badges/upload-image";
export const CREATE_BADGE_LINK = "/admin/badges";
export const UPDATE_BADGE_LINK = (id: number) => `/admin/badges/${id}`;
export const DELETE_BADGE_LINK = (id: number) => `/admin/badges/${id}`;
export const GET_ADMIN_BADGE_LIST_LINK = "/badges";

export const NORMAL_BADGE = "일반 뱃지";
export const ACHIEVEMENT_BADGE = "업적 뱃지";
export const SPECIAL_BADGE = "특별 뱃지";

export const GET_USER_BADGE_LIST_LINK = (modaluserId: string) =>
  `/admin/users/badges/list/${modaluserId}`;
export const PUT_BADGE_TO_USER_LINK = (userId: string, badgeId: number) =>
  `/admin/users/badges?userId=${userId}&badgeId=${badgeId}`;
export const DELETE_USER_BADGE_LINK = (modaluserId: string, badgeId: number) =>
  `/admin/users/badges?userId=${modaluserId}&badgeId=${badgeId}`;
export const GET_USER_LIST_LINK = (
  currentPage: number,
  order: string,
  provider: string
) =>
  `/admin/users?offset=${currentPage}&limit=${USERS_LIMIT_IN_A_PAGE}&order=${order}&provider=${provider}`;
export const GET_USER_LIST_TOTAL_PAGE_LINK = (provider: string) =>
  `/admin/users/count-pages?provider=${provider}&limit=${USERS_LIMIT_IN_A_PAGE}`;

export const USERS_LIMIT_IN_A_PAGE = 5;
