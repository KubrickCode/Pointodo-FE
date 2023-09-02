export const GET_CURRENT_POINTS_LINK = "/points/current";
export const GET_POINTS_LOGS_LINK = (
  type: string,
  currentPage: number,
  order: string
) => `/points/logs/${type}?page=${currentPage}&order=${order}`;
export const GET_POINTS_LOGS_TOTAL_PAGES = (type: string) =>
  `/points/count/${type}`;
