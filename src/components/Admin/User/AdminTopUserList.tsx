import { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useQueryGet } from "../../../hooks/useQueryApi";
import { GET_TOP_USERS } from "../../../shared/constants/admin.constant";
import { QUERY_KEY_GET_TOP_USERS } from "../../../shared/constants/query.constant";
import moment from "moment";
import { TopUser } from "../../../entities/user.entity";
import { useModalStore } from "../../../store/modal.store";
import { MODAL_CONTENT_USER_BADGE_LIST } from "../../../shared/constants/modal.constant";

interface Props {
  tab: number;
}

const AdminTopUserList: FC<Props> = ({ tab }) => {
  const setModalState = useModalStore((state) => state.setModalState);

  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-31"));
  const [list, setList] = useState<TopUser[]>([]);

  const { data } = useQueryGet(
    GET_TOP_USERS(
      moment(startDate).format("YYYY-MM-DD"),
      moment(endDate).format("YYYY-MM-DD")
    ),
    QUERY_KEY_GET_TOP_USERS,
    {
      enabled: tab === 1,
    }
  );

  useEffect(() => {
    setList(data);
  }, [tab, data]);

  return (
    <>
      <div className="flex flex-row my-3 justify-center">
        <div className="py-1 mx-3 dark:text-neutral-200">날짜 범위</div>
        <div>
          <DatePicker
            locale={ko}
            selected={startDate}
            onChange={(date) => {
              if (date! < new Date()) {
                setStartDate(new Date());
              }
              setStartDate(date!);
            }}
            dateFormat="yyyy-MM-dd"
            className="border text-center py-1 rounded dark:bg-neutral-600 dark:text-neutral-200 w-full cursor-pointer text-sm sm:text-base"
          />
        </div>
        <span className="py-1 mx-2">~</span>
        <div>
          <DatePicker
            locale={ko}
            selected={endDate}
            onChange={(date) => {
              if (date! < new Date()) {
                setEndDate(new Date());
              }
              setEndDate(date!);
            }}
            dateFormat="yyyy-MM-dd"
            className="border text-center py-1 rounded dark:bg-neutral-600 dark:text-neutral-200 w-full cursor-pointer text-sm sm:text-base"
          />
        </div>
      </div>
      <div>
        <table className="table-fixed w-full">
          <thead className="border-b p-1 sm:p-5 dark:border-neutral-600">
            <tr>
              <th className="p-1 sm:p-5 text-center border-r w-[30%] dark:border-neutral-600 dark:text-neutral-200">
                유저 ID
              </th>
              <th className="p-1 sm:p-5 text-center border-r w-[30%] dark:border-neutral-600 dark:text-neutral-200">
                이메일
              </th>
              <th
                className={`p-1 sm:p-5 text-center border-r w-[20%] dark:border-neutral-600 dark:text-neutral-200`}
              >
                획득 포인트
              </th>
              <th className="p-1 sm:p-5 text-center border-l w-[20%] dark:border-neutral-600 dark:text-neutral-200">
                작업
              </th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item) => (
              <tr key={item.userId}>
                <td className="p-1 sm:p-5 text-center border-r w-[30%] dark:border-neutral-600">
                  <span className="break-all dark:text-neutral-200">
                    {item.userId}
                  </span>
                </td>
                <td className="p-1 sm:p-5 text-center border-r w-[30%] dark:border-neutral-600">
                  <span className="break-all dark:text-neutral-200">
                    {item.email}
                  </span>
                </td>
                <td className="p-1 sm:p-5 text-center border-r w-[20%] dark:border-neutral-600">
                  <span className="break-all dark:text-neutral-200">
                    {item.points}
                  </span>
                </td>
                <td className="p-1 sm:p-5 text-center border-r w-[20%] relative w-full flex justify-center">
                  <button
                    className="border rounded px-2 py-1 mx-1 bg-blue-300 text-white hover:bg-blue-400 dark:bg-blue-900 dark:hover:bg-blue-950 dark:border-0"
                    onClick={() =>
                      setModalState(
                        true,
                        MODAL_CONTENT_USER_BADGE_LIST,
                        undefined,
                        undefined,
                        undefined,
                        item.userId
                      )
                    }
                  >
                    뱃지 목록
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminTopUserList;
