import { FC } from "react";
import { useModalStore } from "../../../store/modal.store";
import { MODAL_CONTENT_ADD_ADMIN_BADGE } from "../../../shared/constants/modal.constant";

interface Props {
  tab: number;
}

const AdminBadgeHeader: FC<Props> = ({ tab }) => {
  const setModalState = useModalStore((state) => state.setModalState);

  return (
    <>
      <div className="m-3">
        <button
          className="bg-blue-400 text-white p-2 rounded"
          onClick={() =>
            setModalState(true, MODAL_CONTENT_ADD_ADMIN_BADGE(tab))
          }
        >
          뱃지 추가
        </button>
      </div>
    </>
  );
};

export default AdminBadgeHeader;
