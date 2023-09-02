export const GET_CURRENT_POINTS_LINK = "/points/current";
export const GET_POINTS_LOGS_LINK = (
  type: string,
  currentPage: number,
  order: string
) =>
  `/points/logs?transactionType=${type}&offset=${currentPage}&limit=${POINT_LIMIT_IN_A_PAGE}&order=${order}`;
export const GET_POINTS_LOGS_TOTAL_PAGES = (type: string) =>
  `/points/count/${type}`;

export const POINT_LIMIT_IN_A_PAGE = 5;
