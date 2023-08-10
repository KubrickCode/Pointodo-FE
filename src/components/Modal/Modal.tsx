import { FC } from "react";
import { useModalStore } from "../../store/modal.store";
import AddTask from "../Main/Task/AddTask";
import AdminAddBadge from "../Admin/Badge/AdminAddBadge";
import DeleteTask from "../Main/Task/deleteTask";

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
          {modalContent === "addTask0" && <AddTask taskType="DAILY" />}
          {modalContent === "addTask1" && <AddTask taskType="DUE" />}
          {modalContent === "addTask2" && <AddTask taskType="FREE" />}
          {modalContent === "addAdminBadge0" && (
            <AdminAddBadge badgeType="NORMAL" />
          )}
          {modalContent === "addAdminBadge1" && (
            <AdminAddBadge badgeType="ACHIEVEMENT" />
          )}
          {modalContent === "addAdminBadge2" && (
            <AdminAddBadge badgeType="SPECIAL" />
          )}
          {modalContent === "deleteTask" && <DeleteTask />}
        </div>
      </div>
    </>
  );
};

export default Modal;
