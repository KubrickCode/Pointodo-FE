export const UPLOAD_BADGE_LINK = "/admin/badge/upload";
export const CREATE_BADGE_LINK = "/admin/badge/create";
export const UPDATE_BADGE_LINK = (id: number) => `/admin/badge/update/${id}`;
export const DELETE_BADGE_LINK = (id: number) => `/admin/badge/delete/${id}`;
export const GET_ADMIN_BADGE_LIST_LINK = (tab: number) =>
  `/admin/badge/${
    tab === 0 ? "normal" : tab === 1 ? "achievement" : "special"
  }`;

export const NORMAL_BADGE = "일반 뱃지";
export const ACHIEVEMENT_BADGE = "업적 뱃지";
export const SPECIAL_BADGE = "특별 뱃지";

export const GET_USER_BADGE_LIST_LINK = (modaluserId: string) =>
  `/admin/user/badge/list/${modaluserId}`;
export const GET_ALL_BADGE_LIST_LINK = "/badge/all";
export const PUT_BADGE_TO_USER_LINK = "/admin/user/badge/put";
export const DELETE_USER_BADGE_LINK = (modaluserId: string, badgeId: number) =>
  `/admin/user/badge?userId=${modaluserId}&badgeId=${badgeId}`;
