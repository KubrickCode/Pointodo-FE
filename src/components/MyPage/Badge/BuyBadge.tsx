import { FC } from "react";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { useModalStore } from "../../../store/modal.store";
import { useToastStore } from "../../../store/toast.store";
import { useQueryClient } from "react-query";

const BuyBadge: FC = () => {
  const { mutate } = useQueryMutate();
  const setModalState = useModalStore((state) => state.setModalState);
  const modalBadgeId = useModalStore((state) => state.modalBadgeId);
  const setToastState = useToastStore((state) => state.setToastState);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    mutate(
      {
        link: `/badge/buy`,
        method: "post",
        body: { badgeId: modalBadgeId },
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries("getUserBadgeList");
          await queryClient.invalidateQueries("getSpentPointsLogs");
          await queryClient.invalidateQueries("getPoints");
          setToastState(true, "뱃지를 구매하였습니다", "success");
          setModalState(false);
        },
      }
    );
  };

  return (
    <>
      <div>
        <h1 className="text-xl mb-5">해당 뱃지를 구매하시겠습니까?</h1>
        <div className="text-center">
          <button
            className="border bg-blue-500 text-white px-3 py-2 rounded-lg mx-1"
            onClick={handleSubmit}
          >
            구매
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

export default BuyBadge;
