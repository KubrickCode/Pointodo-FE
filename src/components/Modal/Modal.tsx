import { FC } from "react";
import { useModalStore } from "../../store/modal.store";
import AddTask from "../Main/Task/AddTask";

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
          {modalContent === "addTask0" && <AddTask taskType="매일 작업" />}
          {modalContent === "addTask1" && <AddTask taskType="기한 작업" />}
          {modalContent === "addTask2" && <AddTask taskType="무기한 작업" />}
        </div>
      </div>
    </>
  );
};

export default Modal;
