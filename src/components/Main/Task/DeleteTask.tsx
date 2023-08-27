import { FC, useCallback } from "react";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { useToastStore } from "../../../store/toast.store";
import { useQueryClient } from "react-query";
import { useModalStore } from "../../../store/modal.store";
import { DELETE_TASK_LINK } from "../../../shared/constants/task.constant";
import { TaskType } from "../../../entities/task.entity";
import {
  QUERY_KEY_GET_DAILY_TASKS,
  QUERY_KEY_GET_DAILY_TOTAL_PAGES,
  QUERY_KEY_GET_DUE_TASKS,
  QUERY_KEY_GET_DUE_TOTAL_PAGES,
  QUERY_KEY_GET_FREE_TASKS,
  QUERY_KEY_GET_FREE_TOTAL_PAGES,
} from "../../../shared/constants/query.constant";
import { DELETE_TASK_MESSAGE } from "../../../shared/messages/task.message";

const DeleteTask: FC = () => {
  const modalTaskId = useModalStore((state) => state.modalTaskId);
  const modalTaskType = useModalStore((state) => state.modalTaskType);
  const setModalState = useModalStore((state) => state.setModalState);
  const setToastState = useToastStore((state) => state.setToastState);

  const { mutate } = useQueryMutate();
  const queryClient = useQueryClient();

  const handleDelete = useCallback(async () => {
    mutate(
      {
        link: DELETE_TASK_LINK(modalTaskId),
        method: "delete",
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(
            modalTaskType === TaskType.DAILY
              ? QUERY_KEY_GET_DAILY_TASKS
              : modalTaskType === TaskType.DUE
              ? QUERY_KEY_GET_DUE_TASKS
              : QUERY_KEY_GET_FREE_TASKS
          );
          await queryClient.invalidateQueries(
            modalTaskType === TaskType.DAILY
              ? QUERY_KEY_GET_DAILY_TOTAL_PAGES
              : modalTaskType === TaskType.DUE
              ? QUERY_KEY_GET_DUE_TOTAL_PAGES
              : QUERY_KEY_GET_FREE_TOTAL_PAGES
          );
          setToastState(true, DELETE_TASK_MESSAGE, "danger");
          setModalState(false);
        },
      }
    );
  }, [modalTaskId, modalTaskType]);

  return (
    <>
      <div>
        <h1 className="text-xl mb-5">정말 작업을 삭제하시겠습니까?</h1>
        <div className="text-center">
          <button
            className="border bg-red-500 text-white px-3 py-2 rounded-lg mx-1"
            onClick={handleDelete}
          >
            삭제
          </button>
          <button
            className="border px-3 py-2 rounded-lg mx-1"
            onClick={() => setModalState(false)}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteTask;
