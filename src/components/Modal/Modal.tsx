import { FC, memo } from "react";
import { useModalStore } from "../../store/modal.store";
import AddTask from "../Main/Task/AddTask";
import AdminAddBadge from "../Admin/Badge/AdminAddBadge";
import DeleteTask from "../Main/Task/DeleteTask";
import BuyBadge from "../MyPage/Badge/BuyBadge";
import ChangePassword from "../MyPage/Setting/ChangePassword";
import Unregister from "../MyPage/Setting/Unregister";
import AdminUserBadge from "../Admin/User/UserBadge/AdminUserBadge";
import { BadgeType } from "../../entities/badge.entity";
import { TaskType } from "../../entities/task.entity";
import {
  MODAL_CONTENT_ADD_ADMIN_BADGE,
  MODAL_CONTENT_ADD_TASK,
  MODAL_CONTENT_BUY_BADGE,
  MODAL_CONTENT_CHANGE_PASSWORD,
  MODAL_CONTENT_DELETE_TASK,
  MODAL_CONTENT_UNREGISTER,
  MODAL_CONTENT_USER_BADGE_LIST,
} from "../../shared/constants/modal.constant";

const MemoizedAddTask = memo(AddTask);
const MemoizedAdminAddBadge = memo(AdminAddBadge);
const MemoizedDeleteTask = memo(DeleteTask);
const MemoizedBuyBadge = memo(BuyBadge);
const MemoizedChangePassword = memo(ChangePassword);
const MemoizedUnregister = memo(Unregister);
const MemoizedAdminUserBadge = memo(AdminUserBadge);

const modalContentComponents = {
  [MODAL_CONTENT_ADD_TASK(0)]: <MemoizedAddTask taskType={TaskType.DAILY} />,
  [MODAL_CONTENT_ADD_TASK(1)]: <MemoizedAddTask taskType={TaskType.DUE} />,
  [MODAL_CONTENT_ADD_TASK(2)]: <MemoizedAddTask taskType={TaskType.FREE} />,
  [MODAL_CONTENT_ADD_ADMIN_BADGE(0)]: (
    <MemoizedAdminAddBadge badgeType={BadgeType.NORMAL} />
  ),
  [MODAL_CONTENT_ADD_ADMIN_BADGE(1)]: (
    <MemoizedAdminAddBadge badgeType={BadgeType.ACHIEVEMENT} />
  ),
  [MODAL_CONTENT_ADD_ADMIN_BADGE(2)]: (
    <MemoizedAdminAddBadge badgeType={BadgeType.SPECIAL} />
  ),
  [MODAL_CONTENT_DELETE_TASK]: <MemoizedDeleteTask />,
  [MODAL_CONTENT_BUY_BADGE]: <MemoizedBuyBadge />,
  [MODAL_CONTENT_CHANGE_PASSWORD]: <MemoizedChangePassword />,
  [MODAL_CONTENT_UNREGISTER]: <MemoizedUnregister />,
  [MODAL_CONTENT_USER_BADGE_LIST]: <MemoizedAdminUserBadge />,
};

const Modal: FC = () => {
  const modalState = useModalStore((state) => state.modalState);
  const modalContent = useModalStore((state) => state.modalContent);
  const setModalState = useModalStore((state) => state.setModalState);

  if (!modalState) return null;

  const handleCloseModal = () => {
    setModalState(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div
          className="fixed inset-0 bg-black opacity-70"
          onClick={handleCloseModal}
        ></div>
        <div className="relative bg-white p-10 overflow-hidden z-60 rounded-3xl dark:bg-neutral-800">
          {modalContentComponents[modalContent]}
        </div>
      </div>
    </>
  );
};

export default Modal;
