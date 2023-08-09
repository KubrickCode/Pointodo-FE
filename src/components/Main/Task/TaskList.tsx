import { FC, ChangeEvent, useState, useEffect } from "react";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { useQueryClient } from "react-query";
import { useToastStore } from "../../../store/toast.store";
import moment from "moment";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

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
  data: TaskEntity[];
}

const TaskList: FC<Props> = ({ tab, data }) => {
  const { mutate } = useQueryMutate();
  const queryClient = useQueryClient();

  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    if (dueDate < new Date()) {
      setDueDate(new Date());
    }
  }, [dueDate]);

  const setToastState = useToastStore((state) => state.setToastState);

  const [updatedState, setUpdatedState] = useState({ state: false, id: 0 });
  const [updatedBody, setUpdatedBody] = useState({
    name: "",
    description: "",
    importance: 0,
  });

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
            setToastState(true, "작업이 완료되었습니다");
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
            setToastState(true, "작업 완료가 취소되었습니다");
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
          setToastState(true, "작업이 수정되었습니다");
        },
      }
    );
  };

  const handleDelete = async (id: number, taskType: string) => {
    mutate(
      {
        link: `/task/${id}`,
        method: "delete",
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
          setToastState(true, "작업이 삭제되었습니다");
        },
      }
    );
  };

  return (
    <table className="table-fixed w-full">
      <thead className="border-b p-5">
        <tr>
          <th className="p-5 text-center border-r w-[10%]">완료</th>
          <th
            className={`p-5 text-center border-r w-[${
              tab === 1 ? "20" : "30"
            }%]`}
          >
            작업명
          </th>
          <th
            className={`p-5 text-center border-r w-[${
              tab === 1 ? "20" : "30"
            }%]`}
          >
            작업 설명
          </th>
          <th className="p-5 text-center border-l w-[10%]">중요도</th>
          {tab === 1 && (
            <th className="p-5 text-center border-l w-[20%]">작업 기한</th>
          )}
          <th className="p-5 text-center border-l w-[20%]">수정/삭제</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr
            key={item.id}
            className={item.completion === 1 ? "line-through" : ""}
          >
            <td className="p-5 text-center border-r w-[10%] ">
              <div className="flex items-center justify-center mb-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  defaultChecked={item.completion === 0 ? false : true}
                  onChange={(e) => handleCheckboxChange(item, e)}
                />
              </div>
            </td>
            <td
              className={`p-5 text-center border-r w-[${
                tab === 1 ? "20" : "30"
              }%]`}
            >
              {updatedState.state && updatedState.id === item.id ? (
                <input
                  type="text"
                  className="border rounded p-1"
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
              className={`p-5 text-center border-r w-[${
                tab === 1 ? "20" : "30"
              }%]`}
            >
              {updatedState.state && updatedState.id === item.id ? (
                <textarea
                  className="border rounded p-1"
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
            <td className="p-5 text-center border-l w-[10%]">
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
                  <option value={3}>덜 중요</option>
                  <option value={2}>보통</option>
                  <option value={1}>매우 중요</option>
                </select>
              ) : (
                <span>
                  {item.importance === 1
                    ? "매우 중요"
                    : item.importance === 2
                    ? "보통"
                    : "덜 중요"}
                </span>
              )}
            </td>
            {tab === 1 && (
              <td className="p-5 text-center border-l w-[10%]">
                {updatedState.state && updatedState.id === item.id ? (
                  <div className="border p-1 rounded">
                    <DatePicker
                      locale={ko}
                      selected={dueDate}
                      onChange={(date) => setDueDate(date!)}
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
            <td className="p-5 text-center border-l w-[20%]">
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
                    onClick={() => handleDelete(item.id, item.taskType)}
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
  );
};

export default TaskList;
