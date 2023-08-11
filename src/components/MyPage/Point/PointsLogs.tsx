import { FC, useEffect, useState } from "react";
import { useQueryGet } from "../../../hooks/useQueryApi";
import moment from "moment";
import Pagination from "../../Pagination/Pagination";

interface Props {
  tab: number;
  order: string;
}

interface PointLog {
  id: number;
  userId: string;
  points: number;
  occuredAt: string;
  taskId?: number;
  taskName?: string;
  badgeId?: number;
  badgeName?: string;
}

const PointsLogs: FC<Props> = ({ tab, order }) => {
  const [logs, setLogs] = useState<PointLog[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { data: earnedPointsLogs } = useQueryGet(
    `/point/logs/earned?page=${currentPage}&order=${order}`,
    "getEarnedPointsLogs",
    {
      enabled: tab === 0,
    }
  );

  const { data: spentPointsLogs } = useQueryGet(
    `/point/logs/spent?page=${currentPage}&order=${order}`,
    "getSpentPointsLogs",
    {
      enabled: tab === 1,
    }
  );

  const { data: earnedPointTotalPage } = useQueryGet(
    `/point/count/earned`,
    "getEarnedPointTotalPage",
    {
      enabled: tab === 0,
    }
  );

  const { data: spentPointTotalPage } = useQueryGet(
    `/point/count/spent`,
    "getSpentPointTotalPage",
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
        <thead className="border-b p-5">
          <tr>
            <th className="p-5 text-center border-r w-[30%]">거래 날짜</th>
            <th className="p-5 text-center border-r w-[30%]">
              {tab === 0 ? "획득" : "소모"} 포인트
            </th>
            {tab === 0 ? (
              <th className="p-5 text-center border-r w-[40%]">완료 작업명</th>
            ) : (
              <th className="p-5 text-center border-r w-[40%]">구매 뱃지명</th>
            )}
          </tr>
        </thead>
        <tbody>
          {logs?.map((item) => (
            <tr key={item.id}>
              <td className="p-5 text-center border-r w-[30%] ">
                <span className="break-all">
                  {moment.utc(item.occuredAt).format("YYYY-MM-DD")}
                </span>
              </td>
              <td className="p-5 text-center border-r w-[30%] ">
                <span className="break-all">{item.points}</span>
              </td>
              <td className="p-5 text-center border-l w-[40%] ">
                {tab === 0 ? (
                  <span className="break-all">{item.taskName}</span>
                ) : (
                  <span className="break-all">{item.badgeName}</span>
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
