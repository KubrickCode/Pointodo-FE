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
