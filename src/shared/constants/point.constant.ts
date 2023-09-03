export const GET_CURRENT_POINTS_LINK = "/points";
export const GET_POINTS_LOGS_LINK = (
  type: string,
  currentPage: number,
  order: string
) =>
  `/points/logs?transactionType=${type}&offset=${currentPage}&limit=${POINT_LIMIT_IN_A_PAGE}&order=${order}`;
export const GET_POINTS_LOGS_TOTAL_PAGES = (type: string) =>
  `/points/count-pages?transactionType=${type}&limit=${POINT_LIMIT_IN_A_PAGE}`;

export const POINT_LIMIT_IN_A_PAGE = 5;
