import { FC } from "react";
import { useModalStore } from "../../../store/modal.store";

interface Props {
  tab: number;
  setSorted: (sorted: string) => void;
}

const TaskHeader: FC<Props> = ({ tab, setSorted }) => {
  const setModalState = useModalStore((state) => state.setModalState);

  return (
    <>
      <div className="p-3">
        <button
          className="bg-blue-500 rounded px-3 py-2 text-white hover:bg-blue-600"
          onClick={() => setModalState(true, `addTask${tab}`)}
        >
          작업 추가
        </button>
        <select
          className="border px-3 py-2 ml-2 rounded outline-neutral-400"
          onChange={(e) => setSorted(e.target.value)}
        >
          <option value="importance">중요도 순</option>
          <option value="newest">최신 순</option>
          <option value="old">오래된 순</option>
          <option value="name">이름 순</option>
        </select>
      </div>
    </>
  );
};

export default TaskHeader;
