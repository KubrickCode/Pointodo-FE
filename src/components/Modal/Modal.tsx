import { FC } from "react";
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

const Modal: FC = () => {
  const modalState = useModalStore((state) => state.modalState);
  const modalContent = useModalStore((state) => state.modalContent);
  const setModalState = useModalStore((state) => state.setModalState);

  if (!modalState) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div
          className="fixed inset-0 bg-black opacity-70"
          onClick={() => setModalState(false)}
        ></div>
        <div className="relative bg-white p-10 overflow-hidden z-60 rounded-3xl">
          {modalContent === MODAL_CONTENT_ADD_TASK(0) && (
            <AddTask taskType={TaskType.DAILY} />
          )}
          {modalContent === MODAL_CONTENT_ADD_TASK(1) && (
            <AddTask taskType={TaskType.DUE} />
          )}
          {modalContent === MODAL_CONTENT_ADD_TASK(2) && (
            <AddTask taskType={TaskType.FREE} />
          )}
          {modalContent === MODAL_CONTENT_ADD_ADMIN_BADGE(0) && (
            <AdminAddBadge badgeType={BadgeType.NORMAL} />
          )}
          {modalContent === MODAL_CONTENT_ADD_ADMIN_BADGE(1) && (
            <AdminAddBadge badgeType={BadgeType.ACHIEVEMENT} />
          )}
          {modalContent === MODAL_CONTENT_ADD_ADMIN_BADGE(2) && (
            <AdminAddBadge badgeType={BadgeType.SPECIAL} />
          )}
          {modalContent === MODAL_CONTENT_DELETE_TASK && <DeleteTask />}
          {modalContent === MODAL_CONTENT_BUY_BADGE && <BuyBadge />}
          {modalContent === MODAL_CONTENT_CHANGE_PASSWORD && <ChangePassword />}
          {modalContent === MODAL_CONTENT_UNREGISTER && <Unregister />}
          {modalContent === MODAL_CONTENT_USER_BADGE_LIST && <AdminUserBadge />}
        </div>
      </div>
    </>
  );
};

export default Modal;
