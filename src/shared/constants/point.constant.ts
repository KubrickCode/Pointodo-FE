export const GET_CURRENT_POINTS_LINK = "/point/current";
export const GET_POINTS_LOGS_LINK = (
  type: string,
  currentPage: number,
  order: string
) => `/point/logs/${type}?page=${currentPage}&order=${order}`;
export const GET_POINTS_LOGS_TOTAL_PAGES = (type: string) =>
  `/point/count/${type}`;
