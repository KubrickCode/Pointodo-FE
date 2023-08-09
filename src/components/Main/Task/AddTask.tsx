import { FC, useEffect, useState } from "react";
import { useModalStore } from "../../../store/modal.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { useQueryClient } from "react-query";
import { useToastStore } from "../../../store/toast.store";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

interface Props {
  taskType: string;
}

interface AddTaskForm {
  taskType: string;
  name: string;
  description: string;
  importance: number;
}

const AddTask: FC<Props> = ({ taskType }) => {
  const setModalState = useModalStore((state) => state.setModalState);
  const setToastState = useToastStore((state) => state.setToastState);
  const queryClient = useQueryClient();

  console.log(moment(new Date()).format("YYYY-MM-DD"));

  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    if (dueDate < new Date()) {
      setDueDate(new Date());
    }
  }, [dueDate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskForm>();

  const { mutate } = useQueryMutate();

  const onSubmitHandler: SubmitHandler<AddTaskForm> = async (formData) => {
    if (taskType === "DUE") {
      formData = Object.assign(formData, {
        dueDate: moment(dueDate).format("YYYY-MM-DD"),
      });
    }

    mutate(
      {
        link: "/task/create",
        body: formData,
        method: "post",
      },
      {
        onSuccess: async () => {
          setModalState(false);
          await queryClient.invalidateQueries(
            taskType === "DAILY"
              ? "getDailyTasks"
              : taskType === "DUE"
              ? "getDueTasks"
              : "getFreeTasks"
          );
          setToastState(true, "작업이 추가되었습니다");
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h1 className="text-xl text-center mb-5">
          {taskType === "DAILY"
            ? "매일 작업"
            : taskType === "DUE"
            ? "기한 작업"
            : "무기한 작업"}{" "}
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
              required: "작업명은 필수 입력 필드입니다.",
              maxLength: {
                value: 20,
                message: "작업명은 20자 이내로 입력하세요.",
              },
            })}
          />
          {errors.name && errors.name.type === "required" && (
            <div>작업명을 입력해 주세요</div>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <div>작업명은 20자리 이내로 입력하세요.</div>
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
                message: "작업 설명은 500자 이내로 입력하세요.",
              },
            })}
          />
          {errors.description && errors.description.type === "maxLength" && (
            <div>작업명은 20자리 이내로 입력하세요.</div>
          )}
        </div>
        {taskType === "DUE" && (
          <div className="my-2">
            <label className="block my-2 text-sm">작업 기한</label>
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
            <option value={3}>덜 중요</option>
            <option value={2}>보통</option>
            <option value={1}>매우 중요</option>
          </select>
        </div>
        <div className="text-center mt-5">
          <button
            type="submit"
            className="border px-2 py-1 mr-2 rounded-lg bg-neutral-100 hover:bg-neutral-200"
          >
            추가
          </button>
          <button
            type="button"
            className="border px-2 py-1 mr-2 rounded-lg bg-neutral-100 hover:bg-neutral-200"
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
