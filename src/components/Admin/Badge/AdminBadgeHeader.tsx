import { FC } from "react";
import { useModalStore } from "../../../store/modal.store";

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
          onClick={() => setModalState(true, `addAdminBadge${tab}`)}
        >
          뱃지 추가
        </button>
      </div>
    </>
  );
};

export default AdminBadgeHeader;
