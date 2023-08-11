import { FC, useEffect, useState } from "react";
import { useQueryGet } from "../../../hooks/useQueryApi";
import moment from "moment";

interface Props {
  tab: number;
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

const PointsLogs: FC<Props> = ({ tab }) => {
  const [logs, setLogs] = useState<PointLog[]>();

  const { data: earnedPointsLogs } = useQueryGet(
    "/point/logs/earned",
    "getEarnedPointsLogs",
    {
      enabled: tab === 0,
    }
  );

  const { data: spentPointsLogs } = useQueryGet(
    "/point/logs/spent",
    "getSpentPointsLogs",
    {
      enabled: tab === 1,
    }
  );

  useEffect(() => {
    if (tab === 0) {
      setLogs(earnedPointsLogs);
    }
    if (tab === 1) {
      setLogs(spentPointsLogs);
    }
  }, [tab]);

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
    </>
  );
};

export default PointsLogs;
