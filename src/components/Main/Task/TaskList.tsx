import {
  FC,
  ChangeEvent,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
import { TaskEntity, TaskType } from "../../../entities/task.entity";
import {
  CANCLE_TASK_LINK,
  COMPLETE_TASK_LINK,
  GET_TASK_LINK,
  GET_TASK_TOTAL_PAGE,
  UPDATE_TASK_LINK,
} from "../../../shared/constants/task.constant";
import {
  QUERY_KEY_GET_ALL_BADGE_LIST,
  QUERY_KEY_GET_CURRENT_POINTS,
  QUERY_KEY_GET_DAILY_TASKS,
  QUERY_KEY_GET_DAILY_TOTAL_PAGES,
  QUERY_KEY_GET_DUE_TASKS,
  QUERY_KEY_GET_DUE_TOTAL_PAGES,
  QUERY_KEY_GET_EARNED_POINTS_LOGS,
  QUERY_KEY_GET_FREE_TASKS,
  QUERY_KEY_GET_FREE_TOTAL_PAGES,
  QUERY_KEY_GET_USER_BADGE_PROGRESS,
} from "../../../shared/constants/query.constant";
import {
  CANCLE_TASK_MESSAGE,
  COMPLETE_TASK_MESSAGE,
  UPDATE_TASK_MESSAGE,
} from "../../../shared/messages/task.message";
import { MODAL_CONTENT_DELETE_TASK } from "../../../shared/constants/modal.constant";

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
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setToastState = useToastStore((state) => state.setToastState);
  const setModalState = useModalStore((state) => state.setModalState);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [taskList, setTaskList] = useState<TaskEntity[]>();
  const [dueDate, setDueDate] = useState(new Date());
  const [updatedState, setUpdatedState] = useState({ state: false, id: 0 });
  const [updatedBody, setUpdatedBody] = useState(initialUpdatedBody);

  const queryClient = useQueryClient();
  const { mutate } = useQueryMutate();

  const { data: dailyTasks } = useQueryGet(
    GET_TASK_LINK(TaskType.DAILY, currentPage, order),
    QUERY_KEY_GET_DAILY_TASKS,
    {
      enabled: tab === 0 && isLoggedIn,
    }
  );

  const { data: dueTasks } = useQueryGet(
    GET_TASK_LINK(TaskType.DUE, currentPage, order),
    QUERY_KEY_GET_DUE_TASKS,
    {
      enabled: tab === 1 && isLoggedIn,
    }
  );

  const { data: freeTasks } = useQueryGet(
    GET_TASK_LINK(TaskType.FREE, currentPage, order),
    QUERY_KEY_GET_FREE_TASKS,
    {
      enabled: tab === 2 && isLoggedIn,
    }
  );

  const { data: dailyTotalPage } = useQueryGet(
    GET_TASK_TOTAL_PAGE("daily"),
    QUERY_KEY_GET_DAILY_TOTAL_PAGES,
    {
      enabled: tab === 0 && isLoggedIn,
    }
  );

  const { data: dueTotalPage } = useQueryGet(
    GET_TASK_TOTAL_PAGE("due"),
    QUERY_KEY_GET_DUE_TOTAL_PAGES,
    {
      enabled: tab === 1 && isLoggedIn,
    }
  );

  const { data: freeTotalPage } = useQueryGet(
    GET_TASK_TOTAL_PAGE("free"),
    QUERY_KEY_GET_FREE_TOTAL_PAGES,
    {
      enabled: tab === 2 && isLoggedIn,
    }
  );

  const tabData = useMemo(
    () => [
      {
        tasks: dailyTasks,
        totalPage: dailyTotalPage?.totalPages,
      },
      {
        tasks: dueTasks,
        totalPage: dueTotalPage?.totalPages,
      },
      {
        tasks: freeTasks,
        totalPage: freeTotalPage?.totalPages,
      },
    ],
    [
      dailyTasks,
      dueTasks,
      freeTasks,
      dailyTotalPage,
      dueTotalPage,
      freeTotalPage,
    ]
  );

  useEffect(() => {
    const currentTabData = tabData[tab];

    setTotalPage(currentTabData.totalPage);

    if (checkedCompletion) {
      setTaskList(
        currentTabData.tasks?.filter(
          (item: TaskEntity) => item.completion !== 1
        )
      );
    } else {
      setTaskList(currentTabData.tasks);
    }
  }, [tab, tabData, checkedCompletion]);

  useEffect(() => {
    if (totalPage === 1) setCurrentPage(1);
  }, [totalPage]);

  const handleCheckboxChange = useCallback(
    async (item: TaskEntity, e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        mutate(
          {
            link: COMPLETE_TASK_LINK(item.id),
            method: "patch",
            body: { completion: 1 },
          },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries(
                item.taskType === TaskType.DAILY
                  ? QUERY_KEY_GET_DAILY_TASKS
                  : item.taskType === TaskType.DUE
                  ? QUERY_KEY_GET_DUE_TASKS
                  : QUERY_KEY_GET_FREE_TASKS
              );
              await queryClient.invalidateQueries(QUERY_KEY_GET_CURRENT_POINTS);
              await queryClient.invalidateQueries(QUERY_KEY_GET_ALL_BADGE_LIST);
              await queryClient.invalidateQueries(
                QUERY_KEY_GET_USER_BADGE_PROGRESS
              );
              await queryClient.invalidateQueries(
                QUERY_KEY_GET_EARNED_POINTS_LOGS
              );
              setToastState(true, COMPLETE_TASK_MESSAGE, "success");
            },
          }
        );
      }
      if (!e.target.checked) {
        mutate(
          {
            link: CANCLE_TASK_LINK(item.id),
            method: "patch",
            body: { completion: 0 },
          },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries(
                item.taskType === TaskType.DAILY
                  ? QUERY_KEY_GET_DAILY_TASKS
                  : item.taskType === TaskType.DUE
                  ? QUERY_KEY_GET_DUE_TASKS
                  : QUERY_KEY_GET_FREE_TASKS
              );
              setToastState(true, CANCLE_TASK_MESSAGE, "success");
            },
          }
        );
      }
    },
    []
  );

  const handleUpdate = useCallback(
    async (id: number, taskType: string) => {
      let body = {
        name: updatedBody.name,
        description: updatedBody.description,
        importance: updatedBody.importance,
      };
      if (taskType === TaskType.DUE) {
        body = Object.assign(body, {
          dueDate: moment(dueDate).format("YYYY-MM-DD"),
        });
      }

      mutate(
        {
          link: UPDATE_TASK_LINK(id),
          method: "patch",
          body,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(
              taskType === TaskType.DAILY
                ? QUERY_KEY_GET_DAILY_TASKS
                : taskType === TaskType.DUE
                ? QUERY_KEY_GET_DUE_TASKS
                : QUERY_KEY_GET_FREE_TASKS
            );
            setUpdatedState({
              ...updatedState,
              state: false,
              id: 0,
            });
            setToastState(true, UPDATE_TASK_MESSAGE, "success");
          },
        }
      );
    },
    [updatedBody, dueDate, updatedState]
  );

  return (
    <div>
      <table className="table-fixed w-full">
        <thead className="border-b p-2 sm:p-5 dark:border-neutral-600">
          <tr>
            <th className="p-2 sm:p-5 text-center border-r dark:border-neutral-600 w-[10%] dark:text-neutral-200 text-sm sm:text-base">
              완료
            </th>
            <th
              className={`p-2 sm:p-5 text-center border-r dark:border-neutral-600 dark:text-neutral-200 text-sm sm:text-base w-[${
                tab === 1 ? "20" : "30"
              }%]`}
            >
              작업명
            </th>
            <th
              className={`p-2 sm:p-5 text-center border-r dark:border-neutral-600 dark:text-neutral-200 text-sm sm:text-base w-[${
                tab === 1 ? "20" : "30"
              }%]`}
            >
              작업 설명
            </th>
            <th className="p-2 sm:p-5 text-center border-l dark:border-neutral-600 dark:text-neutral-200 text-sm sm:text-base w-[10%]">
              중요도
            </th>
            {tab === 1 && (
              <th className="p-2 sm:p-5 text-center border-l dark:border-neutral-600 dark:text-neutral-200 text-sm sm:text-base w-[20%]">
                작업 기한
              </th>
            )}
            <th className="p-2 sm:p-5 text-center border-l dark:border-neutral-600 dark:text-neutral-200 text-sm sm:text-base w-[20%]">
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
                  ? "line-through dark:decoration-neutral-200"
                  : ""
              }
            >
              <td className="p-2 sm:p-5 text-center border-r dark:border-neutral-600 w-[10%] ">
                <div className="flex items-center justify-center mb-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    defaultChecked={item.completion === 0 ? false : true}
                    onChange={(e) => handleCheckboxChange(item, e)}
                    disabled={moment(item.dueDate).isBefore(
                      moment(new Date()).format("YYYY-MM-DD")
                    )}
                  />
                </div>
              </td>
              <td
                className={`p-2 sm:p-5 text-center border-r dark:border-neutral-600 w-[${
                  tab === 1 ? "20" : "30"
                }%]`}
              >
                {updatedState.state && updatedState.id === item.id ? (
                  <input
                    type="text"
                    className="border rounded p-1 w-full dark:bg-neutral-600 dark:text-neutral-200 text-sm sm:text-base"
                    value={updatedBody.name}
                    required
                    minLength={1}
                    maxLength={20}
                    onChange={(e) =>
                      setUpdatedBody({ ...updatedBody, name: e.target.value })
                    }
                  />
                ) : (
                  <span className="break-all dark:text-neutral-200 text-sm sm:text-base">
                    {item.name}
                  </span>
                )}
              </td>

              <td
                className={`p-2 sm:p-5 text-center border-r dark:border-neutral-600 w-[${
                  tab === 1 ? "20" : "30"
                }%]`}
              >
                {updatedState.state && updatedState.id === item.id ? (
                  <textarea
                    className="border rounded p-1 w-full dark:bg-neutral-600 dark:text-neutral-200 text-sm sm:text-base"
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
                  <span className="break-all dark:text-neutral-200 text-sm sm:text-base">
                    {item.description || "설명이 없습니다"}
                  </span>
                )}
              </td>
              <td className="p-2 sm:p-5 text-center border-l dark:border-neutral-600 w-[10%]">
                {updatedState.state && updatedState.id === item.id ? (
                  <select
                    className="w-full border p-1 rounded outline-neutral-400 dark:bg-neutral-600 dark:text-neutral-200 text-sm sm:text-base"
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
                  <span className="dark:text-neutral-200 text-sm sm:text-base">
                    {item.importance === 1
                      ? "상"
                      : item.importance === 2
                      ? "중"
                      : "하"}
                  </span>
                )}
              </td>
              {tab === 1 && (
                <td className="p-2 sm:p-5 text-center border-l dark:border-neutral-600 w-[10%]">
                  {updatedState.state && updatedState.id === item.id ? (
                    <div className="border p-1 rounded w-full">
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
                        className="dark:bg-neutral-600 dark:text-neutral-200 w-full cursor-pointer text-sm sm:text-base"
                      />
                    </div>
                  ) : (
                    <span className="dark:text-neutral-200 text-sm sm:text-base">{`${moment
                      .utc(item.occurredAt)
                      .format("YYYY-MM-DD")} ~ ${item.dueDate}`}</span>
                  )}
                </td>
              )}
              <td className="p-2 sm:p-5 text-center border-l dark:border-neutral-600 w-[20%]">
                {updatedState.state && updatedState.id === item.id ? (
                  <>
                    <button
                      className="border rounded px-2 py-1 mx-1 bg-blue-400 text-white hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 dark:border-0 text-sm sm:text-base"
                      onClick={() => handleUpdate(item.id, item.taskType)}
                    >
                      완료
                    </button>
                    <button
                      className="border rounded px-2 py-1 mx-1 bg-red-400 text-white hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-800 dark:border-0 text-sm sm:text-base"
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
                      className="border rounded px-2 py-1 mx-1 bg-blue-300 text-white hover:bg-blue-400 dark:bg-blue-900 dark:hover:bg-blue-950 dark:border-0 text-sm sm:text-base"
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
                      className="border rounded px-2 py-1 mx-1 bg-red-300 text-white hover:bg-red-400 dark:bg-red-900 dark:hover:bg-red-950 dark:border-0 text-sm sm:text-base"
                      onClick={() =>
                        setModalState(
                          true,
                          MODAL_CONTENT_DELETE_TASK,
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
