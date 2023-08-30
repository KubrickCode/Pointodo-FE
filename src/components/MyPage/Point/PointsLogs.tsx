import { FC, useEffect, useState } from "react";
import { useQueryGet } from "../../../hooks/useQueryApi";
import moment from "moment";
import Pagination from "../../Pagination/Pagination";
import { PointLog } from "../../../entities/point.entity";
import {
  GET_POINTS_LOGS_LINK,
  GET_POINTS_LOGS_TOTAL_PAGES,
} from "../../../shared/constants/point.constant";
import {
  QUERY_KEY_GET_EARNED_POINTS_LOGS,
  QUERY_KEY_GET_EARNED_POINTS_TOTAL_PAGES,
  QUERY_KEY_GET_SPENT_POINTS_LOGS,
  QUERY_KEY_GET_SPENT_POINTS_TOTAL_PAGES,
} from "../../../shared/constants/query.constant";

interface Props {
  tab: number;
  order: string;
}

const PointsLogs: FC<Props> = ({ tab, order }) => {
  const [logs, setLogs] = useState<PointLog[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { data: earnedPointsLogs } = useQueryGet(
    GET_POINTS_LOGS_LINK("earned", currentPage, order),
    QUERY_KEY_GET_EARNED_POINTS_LOGS,
    {
      enabled: tab === 0,
    }
  );

  const { data: spentPointsLogs } = useQueryGet(
    GET_POINTS_LOGS_LINK("spent", currentPage, order),
    QUERY_KEY_GET_SPENT_POINTS_LOGS,
    {
      enabled: tab === 1,
    }
  );

  const { data: earnedPointTotalPage } = useQueryGet(
    GET_POINTS_LOGS_TOTAL_PAGES("earned"),
    QUERY_KEY_GET_EARNED_POINTS_TOTAL_PAGES,
    {
      enabled: tab === 0,
    }
  );

  const { data: spentPointTotalPage } = useQueryGet(
    GET_POINTS_LOGS_TOTAL_PAGES("spent"),
    QUERY_KEY_GET_SPENT_POINTS_TOTAL_PAGES,
    {
      enabled: tab === 1,
    }
  );

  useEffect(() => {
    if (tab === 0) {
      setLogs(earnedPointsLogs);
      setTotalPage(earnedPointTotalPage?.totalPages);
    }
    if (tab === 1) {
      setLogs(spentPointsLogs);
      setTotalPage(spentPointTotalPage?.totalPages);
    }
  }, [
    tab,
    earnedPointsLogs,
    spentPointsLogs,
    earnedPointTotalPage,
    spentPointTotalPage,
  ]);

  return (
    <>
      <table className="table-fixed w-full">
        <thead className="border-b p-5 dark:border-neutral-600">
          <tr>
            <th className="p-3 sm:p-5 text-center border-r w-[30%] dark:border-neutral-600 dark:text-neutral-200 text-sm sm:text-base">
              거래 날짜
            </th>
            <th className="p-3 sm:p-5 text-center border-r w-[30%] dark:border-neutral-600 dark:text-neutral-200 text-sm sm:text-base">
              {tab === 0 ? "획득" : "소모"} 포인트
            </th>
            {tab === 0 ? (
              <th className="p-3 sm:p-5 text-center border-r w-[40%] dark:border-neutral-600 dark:text-neutral-200 text-sm sm:text-base">
                완료 작업명
              </th>
            ) : (
              <th className="p-3 sm:p-5 text-center border-r w-[40%] dark:border-neutral-600 dark:text-neutral-200 text-sm sm:text-base">
                구매 뱃지명
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {logs?.map((item) => (
            <tr key={item.id}>
              <td className="p-3 sm:p-5 text-center border-r w-[30%] dark:border-neutral-600">
                <span className="break-all dark:text-neutral-200 text-sm sm:text-base">
                  {moment.utc(item.occuredAt).format("YYYY-MM-DD")}
                </span>
              </td>
              <td className="p-3 sm:p-5 text-center border-r w-[30%] dark:border-neutral-600">
                <span className="break-all dark:text-neutral-200 text-sm sm:text-base">
                  {item.points}
                </span>
              </td>
              <td className="p-3 sm:p-5 text-center border-l w-[40%] dark:border-neutral-600">
                {tab === 0 ? (
                  <span className="break-all dark:text-neutral-200 text-sm sm:text-base">
                    {item.taskName}
                  </span>
                ) : (
                  <span className="break-all dark:text-neutral-200 text-sm sm:text-base">
                    {item.badgeName}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-5 w-full flex justify-center">
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default PointsLogs;
