import { FC, useCallback } from "react";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { useModalStore } from "../../../store/modal.store";
import { useToastStore } from "../../../store/toast.store";
import { useQueryClient } from "react-query";
import { BUY_BADGE_LINK } from "../../../shared/constants/badge.constant";
import {
  QUERY_KEY_GET_CURRENT_POINTS,
  QUERY_KEY_GET_MY_BADGE_LIST,
  QUERY_KEY_GET_SPENT_POINTS_LOGS,
} from "../../../shared/constants/query.constant";
import { BUY_BADGE_MESSAGE } from "../../../shared/messages/badge.message";

const BuyBadge: FC = () => {
  const setModalState = useModalStore((state) => state.setModalState);
  const modalBadgeId = useModalStore((state) => state.modalBadgeId);
  const setToastState = useToastStore((state) => state.setToastState);

  const { mutate } = useQueryMutate();
  const queryClient = useQueryClient();

  const handleSubmit = useCallback(async () => {
    mutate(
      {
        link: BUY_BADGE_LINK(modalBadgeId),
        method: "put",
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(QUERY_KEY_GET_MY_BADGE_LIST);
          await queryClient.invalidateQueries(QUERY_KEY_GET_SPENT_POINTS_LOGS);
          await queryClient.invalidateQueries(QUERY_KEY_GET_CURRENT_POINTS);
          setToastState(true, BUY_BADGE_MESSAGE, "success");
          setModalState(false);
        },
      }
    );
  }, [modalBadgeId]);

  return (
    <>
      <div>
        <h1 className="text-xl mb-5 dark:text-neutral-200">
          해당 뱃지를 구매하시겠습니까?
        </h1>
        <div className="text-center">
          <button
            className="border bg-blue-500 text-white px-2 py-1 rounded-lg mx-1 hover:bg-blue-600 dark:border-0"
            onClick={handleSubmit}
          >
            구매
          </button>
          <button
            className="border px-2 py-1 rounded-lg mx-1 bg-neutral-100 hover:bg-neutral-300 dark:border-0 dark:bg-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
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
