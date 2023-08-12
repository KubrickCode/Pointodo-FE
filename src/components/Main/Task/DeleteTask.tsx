import { FC } from "react";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { useToastStore } from "../../../store/toast.store";
import { useQueryClient } from "react-query";
import { useModalStore } from "../../../store/modal.store";

const DeleteTask: FC = () => {
  const { mutate } = useQueryMutate();
  const modalTaskId = useModalStore((state) => state.modalTaskId);
  const modalTaskType = useModalStore((state) => state.modalTaskType);
  const setModalState = useModalStore((state) => state.setModalState);
  const setToastState = useToastStore((state) => state.setToastState);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    mutate(
      {
        link: `/task/${modalTaskId}`,
        method: "delete",
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(
            modalTaskType === "DAILY"
              ? "getDailyTasks"
              : modalTaskType === "DUE"
              ? "getDueTasks"
              : "getFreeTasks"
          );
          setToastState(true, "작업이 삭제되었습니다", "danger");
          setModalState(false);
        },
      }
    );
  };

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
