import { FC } from "react";
import { useModalStore } from "../../../store/modal.store";

interface Props {
  tab: number;
}

const TaskHeader: FC<Props> = ({ tab }) => {
  const setModalState = useModalStore((state) => state.setModalState);

  return (
    <>
      <div className="mb-5">
        <button
          className="bg-neutral-200"
          onClick={() => setModalState(true, `addTask${tab}`)}
        >
          작업 추가
        </button>
      </div>
    </>
  );
};

export default TaskHeader;
