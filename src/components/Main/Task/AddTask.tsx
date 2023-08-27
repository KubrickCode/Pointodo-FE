import { FC, useCallback, useEffect, useState } from "react";
import { useModalStore } from "../../../store/modal.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { useQueryClient } from "react-query";
import { useToastStore } from "../../../store/toast.store";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { TaskEntity, TaskType } from "../../../entities/task.entity";
import {
  CREATE_TASK_LINK,
  DAILY_TASK,
  DUE_TASK,
  FREE_TASK,
} from "../../../shared/constants/task.constant";
import {
  QUERY_KEY_GET_DAILY_TASKS,
  QUERY_KEY_GET_DUE_TASKS,
  QUERY_KEY_GET_FREE_TASKS,
} from "../../../shared/constants/query.constant";
import { CREATE_TASK_MESSAGE } from "../../../shared/messages/task.message";
import {
  TASK_DESC_LENGTH_ERROR,
  TASK_NAME_EMPTY_ERROR,
  TASK_NAME_LENGTH_ERROR,
} from "../../../shared/messages/task.error";

interface Props {
  taskType: TaskType;
}

type AddTaskForm = Pick<
  TaskEntity,
  "taskType" | "name" | "description" | "importance"
>;

const AddTask: FC<Props> = ({ taskType }) => {
  const setModalState = useModalStore((state) => state.setModalState);
  const setToastState = useToastStore((state) => state.setToastState);

  const [dueDate, setDueDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskForm>();

  const queryClient = useQueryClient();
  const { mutate } = useQueryMutate();

  useEffect(() => {
    if (dueDate < new Date()) {
      setDueDate(new Date());
    }
  }, [dueDate]);

  const onSubmitHandler: SubmitHandler<AddTaskForm> = useCallback(
    async (formData) => {
      if (taskType === TaskType.DUE) {
        formData = Object.assign(formData, {
          dueDate: moment(dueDate).format("YYYY-MM-DD"),
        });
      }

      mutate(
        {
          link: CREATE_TASK_LINK,
          body: formData,
          method: "post",
        },
        {
          onSuccess: async () => {
            setModalState(false);
            await queryClient.invalidateQueries(
              taskType === TaskType.DAILY
                ? QUERY_KEY_GET_DAILY_TASKS
                : taskType === TaskType.DUE
                ? QUERY_KEY_GET_DUE_TASKS
                : QUERY_KEY_GET_FREE_TASKS
            );
            await queryClient.invalidateQueries(
              taskType === TaskType.DAILY
                ? QUERY_KEY_GET_DAILY_TASKS
                : taskType === TaskType.DUE
                ? QUERY_KEY_GET_DUE_TASKS
                : QUERY_KEY_GET_FREE_TASKS
            );
            setToastState(true, CREATE_TASK_MESSAGE, "success");
          },
        }
      );
    },
    [taskType, dueDate]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h1 className="text-xl text-center mb-5">
          {taskType === TaskType.DAILY
            ? DAILY_TASK
            : taskType === TaskType.DUE
            ? DUE_TASK
            : FREE_TASK}{" "}
          추가
        </h1>
        <div className="my-2">
          <label className="block my-2 text-sm">작업명</label>
          <input type="hidden" value={taskType} {...register("taskType")} />
          <input
            type="text"
            className="border p-1 rounded outline-neutral-400"
            maxLength={20}
            required
            {...register("name", {
              required: TASK_NAME_EMPTY_ERROR,
              maxLength: {
                value: 20,
                message: TASK_NAME_LENGTH_ERROR,
              },
            })}
          />
          {errors.name && errors.name.type === "required" && (
            <div>{errors.name.message}</div>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <div>{errors.name.message}</div>
          )}
        </div>
        <div className="my-2">
          <label className="block my-2 text-sm">작업 설명</label>
          <textarea
            className="border p-1 rounded outline-neutral-400 w-full"
            maxLength={500}
            {...register("description", {
              maxLength: {
                value: 500,
                message: TASK_DESC_LENGTH_ERROR,
              },
            })}
          />
          {errors.description && errors.description.type === "maxLength" && (
            <div>{errors.description.message}</div>
          )}
        </div>
        {taskType === "DUE" && (
          <div className="my-2">
            <label className="block my-2 text-sm">만료 기한</label>
            <div className="border p-1 rounded">
              <DatePicker
                locale={ko}
                selected={dueDate}
                onChange={(date) => setDueDate(date!)}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
        )}
        <div className="my-2">
          <label className="block my-2 text-sm">작업 우선도</label>
          <select
            className="w-full border p-1 rounded outline-neutral-400"
            {...register("importance")}
          >
            <option value={3}>하</option>
            <option value={2}>중</option>
            <option value={1}>상</option>
          </select>
        </div>
        <div className="text-center mt-5">
          <button
            type="submit"
            className="border px-2 py-1 mr-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            추가
          </button>
          <button
            type="button"
            className="border-2 px-2 py-1 mr-2 rounded-lg bg-white hover:bg-neutral-200"
            onClick={() => setModalState(false)}
          >
            취소
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTask;
