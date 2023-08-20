import { FC, ChangeEvent, useState, useEffect } from "react";
import { useQueryGet, useQueryMutate } from "../../../hooks/useQueryApi";
import { useQueryClient } from "react-query";
import { useToastStore } from "../../../store/toast.store";
import moment from "moment";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useModalStore } from "../../../store/modal.store";
import Pagination from "../../Pagination/Pagination";
import { useUserStore } from "../../../store/user.store";

export interface TaskEntity {
  id: number;
  userId: string;
  taskType: string;
  name: string;
  description: string;
  completion: number;
  importance: number;
  occurredAt: string;
  dueDate?: string;
}

interface Props {
  tab: number;
  order: string;
  checkedCompletion: boolean;
}

const initialUpdatedBody = {
  name: "",
  description: "",
  importance: 0,
};

const TaskList: FC<Props> = ({ tab, order, checkedCompletion }) => {
  const { mutate } = useQueryMutate();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { data: dailyTasks } = useQueryGet(
    `/task?taskType=DAILY&page=${currentPage}&order=${order}`,
    "getDailyTasks",
    {
      enabled: tab === 0 && isLoggedIn,
    }
  );

  const { data: dueTasks } = useQueryGet(
    `/task?taskType=DUE&page=${currentPage}&order=${order}`,
    "getDueTasks",
    {
      enabled: tab === 1 && isLoggedIn,
    }
  );

  const { data: freeTasks } = useQueryGet(
    `/task?taskType=FREE&page=${currentPage}&order=${order}`,
    "getFreeTasks",
    {
      enabled: tab === 2 && isLoggedIn,
    }
  );

  const { data: dailyTotalPage } = useQueryGet(
    "/task/count/daily",
    "getDailyTotalPage",
    {
      enabled: tab === 0 && isLoggedIn,
    }
  );

  const { data: dueTotalPage } = useQueryGet(
    "/task/count/due",
    "getDueTotalPage",
    {
      enabled: tab === 1 && isLoggedIn,
    }
  );

  const { data: freeTotalPage } = useQueryGet(
    "/task/count/free",
    "getFreeTotalPage",
    {
      enabled: tab === 2 && isLoggedIn,
    }
  );

  const [taskList, setTaskList] = useState<TaskEntity[]>();

  const [dueDate, setDueDate] = useState(new Date());

  const setToastState = useToastStore((state) => state.setToastState);
  const setModalState = useModalStore((state) => state.setModalState);

  const [updatedState, setUpdatedState] = useState({ state: false, id: 0 });
  const [updatedBody, setUpdatedBody] = useState(initialUpdatedBody);

  useEffect(() => {
    if (tab === 0) {
      setTotalPage(dailyTotalPage?.totalPages);
      if (checkedCompletion) {
        setTaskList(
          dailyTasks?.filter((item: TaskEntity) => item.completion !== 1)
        );
      } else {
        setTaskList(dailyTasks);
      }
    }
    if (tab === 1) {
      setTotalPage(dueTotalPage?.totalPages);
      if (checkedCompletion) {
        setTaskList(
          dueTasks?.filter((item: TaskEntity) => item.completion !== 1)
        );
      } else {
        setTaskList(dueTasks);
      }
    }
    if (tab === 2) {
      setTotalPage(freeTotalPage?.totalPages);
      if (checkedCompletion) {
        setTaskList(
          freeTasks?.filter((item: TaskEntity) => item.completion !== 1)
        );
      } else {
        setTaskList(freeTasks);
      }
    }
  }, [
    tab,
    dailyTasks,
    dueTasks,
    freeTasks,
    dailyTotalPage,
    dueTotalPage,
    freeTotalPage,
    checkedCompletion,
  ]);

  useEffect(() => {
    if (totalPage === 1) setCurrentPage(1);
  }, [totalPage]);

  const handleCheckboxChange = (
    item: TaskEntity,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      mutate(
        {
          link: `/task/complete/${item.id}`,
          method: "patch",
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(
              item.taskType === "DAILY"
                ? "getDailyTasks"
                : item.taskType === "DUE"
                ? "getDueTasks"
                : "getFreeTasks"
            );
            await queryClient.invalidateQueries("getPoints");
            await queryClient.invalidateQueries("getAllBadges");
            await queryClient.invalidateQueries("getUserBadgeProgress");
            await queryClient.invalidateQueries("getEarnedPointsLogs");
            setToastState(true, "작업이 완료되었습니다", "success");
          },
        }
      );
    }
    if (!e.target.checked) {
      mutate(
        {
          link: `/task/cancle/${item.id}`,
          method: "patch",
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(
              item.taskType === "DAILY"
                ? "getDailyTasks"
                : item.taskType === "DUE"
                ? "getDueTasks"
                : "getFreeTasks"
            );
            setToastState(true, "작업 완료가 취소되었습니다", "success");
          },
        }
      );
    }
  };

  const handleUpdate = async (id: number, taskType: string) => {
    let body = {
      id,
      name: updatedBody.name,
      description: updatedBody.description,
      importance: updatedBody.importance,
    };
    if (taskType === "DUE") {
      body = Object.assign(body, {
        dueDate: moment(dueDate).format("YYYY-MM-DD"),
      });
    }

    mutate(
      {
        link: "/task/update",
        method: "patch",
        body,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(
            taskType === "DAILY"
              ? "getDailyTasks"
              : taskType === "DUE"
              ? "getDueTasks"
              : "getFreeTasks"
          );
          setUpdatedState({
            ...updatedState,
            state: false,
            id: 0,
          });
          setToastState(true, "작업이 수정되었습니다", "success");
        },
      }
    );
  };

  return (
    <div>
      <table className="table-fixed w-full">
        <thead className="border-b p-2 sm:p-5">
          <tr>
            <th className="p-2 sm:p-5 text-center border-r w-[10%]">완료</th>
            <th
              className={`p-2 sm:p-5 text-center border-r w-[${
                tab === 1 ? "20" : "30"
              }%]`}
            >
              작업명
            </th>
            <th
              className={`p-2 sm:p-5 text-center border-r w-[${
                tab === 1 ? "20" : "30"
              }%]`}
            >
              작업 설명
            </th>
            <th className="p-2 sm:p-5 text-center border-l w-[10%]">중요도</th>
            {tab === 1 && (
              <th className="p-2 sm:p-5 text-center border-l w-[20%]">
                작업 기한
              </th>
            )}
            <th className="p-2 sm:p-5 text-center border-l w-[20%]">
              수정/삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {taskList?.map((item) => (
            <tr
              key={item.id}
              className={
                item.completion === 1 ||
                moment(item.dueDate).isBefore(
                  moment(new Date()).format("YYYY-MM-DD")
                )
                  ? "line-through"
                  : ""
              }
            >
              <td className="p-2 sm:p-5 text-center border-r w-[10%] ">
                <div className="flex items-center justify-center mb-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    defaultChecked={item.completion === 0 ? false : true}
                    onChange={(e) => handleCheckboxChange(item, e)}
                    disabled={moment(item.dueDate).isBefore(
                      moment(new Date()).format("YYYY-MM-DD")
                    )}
                  />
                </div>
              </td>
              <td
                className={`p-2 sm:p-5 text-center border-r w-[${
                  tab === 1 ? "20" : "30"
                }%]`}
              >
                {updatedState.state && updatedState.id === item.id ? (
                  <input
                    type="text"
                    className="border rounded p-1 w-full"
                    value={updatedBody.name}
                    required
                    minLength={1}
                    maxLength={20}
                    onChange={(e) =>
                      setUpdatedBody({ ...updatedBody, name: e.target.value })
                    }
                  />
                ) : (
                  <span className="break-all">{item.name}</span>
                )}
              </td>

              <td
                className={`p-2 sm:p-5 text-center border-r w-[${
                  tab === 1 ? "20" : "30"
                }%]`}
              >
                {updatedState.state && updatedState.id === item.id ? (
                  <textarea
                    className="border rounded p-1 w-full"
                    value={updatedBody.description || ""}
                    maxLength={500}
                    onChange={(e) =>
                      setUpdatedBody({
                        ...updatedBody,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="break-all">
                    {item.description || "설명이 없습니다"}
                  </span>
                )}
              </td>
              <td className="p-2 sm:p-5 text-center border-l w-[10%]">
                {updatedState.state && updatedState.id === item.id ? (
                  <select
                    className="w-full border p-1 rounded outline-neutral-400"
                    value={updatedBody.importance}
                    onChange={(e) =>
                      setUpdatedBody({
                        ...updatedBody,
                        importance: Number(e.target.value),
                      })
                    }
                  >
                    <option className="w-10" value={3}>
                      하
                    </option>
                    <option className="w-10" value={2}>
                      중
                    </option>
                    <option className="w-10" value={1}>
                      상
                    </option>
                  </select>
                ) : (
                  <span>
                    {item.importance === 1
                      ? "상"
                      : item.importance === 2
                      ? "중"
                      : "하"}
                  </span>
                )}
              </td>
              {tab === 1 && (
                <td className="p-2 sm:p-5 text-center border-l w-[10%]">
                  {updatedState.state && updatedState.id === item.id ? (
                    <div className="border p-1 rounded">
                      <DatePicker
                        locale={ko}
                        selected={dueDate}
                        onChange={(date) => {
                          if (date! < new Date()) {
                            setDueDate(new Date());
                          }
                          setDueDate(date!);
                        }}
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                  ) : (
                    <span>{`${moment
                      .utc(item.occurredAt)
                      .format("YYYY-MM-DD")} ~ ${item.dueDate}`}</span>
                  )}
                </td>
              )}
              <td className="p-2 sm:p-5 text-center border-l w-[20%]">
                {updatedState.state && updatedState.id === item.id ? (
                  <>
                    <button
                      className="border rounded px-2 py-1 mx-1 bg-blue-400 text-white hover:bg-blue-500"
                      onClick={() => handleUpdate(item.id, item.taskType)}
                    >
                      완료
                    </button>
                    <button
                      className="border rounded px-2 py-1 mx-1 bg-red-400 text-white hover:bg-red-500"
                      onClick={() => {
                        setUpdatedState({
                          ...updatedState,
                          state: false,
                          id: 0,
                        });
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="border rounded px-2 py-1 mx-1 bg-blue-300 text-white hover:bg-blue-400"
                      onClick={() => {
                        setUpdatedState({
                          ...updatedState,
                          state: true,
                          id: item.id,
                        });
                        setUpdatedBody({
                          ...updatedBody,
                          name: item.name,
                          description: item.description,
                          importance: item.importance,
                        });
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="border rounded px-2 py-1 mx-1 bg-red-300 text-white hover:bg-red-400"
                      onClick={() =>
                        setModalState(
                          true,
                          "deleteTask",
                          item.id,
                          item.taskType
                        )
                      }
                    >
                      삭제
                    </button>
                  </>
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
    </div>
  );
};

export default TaskList;
