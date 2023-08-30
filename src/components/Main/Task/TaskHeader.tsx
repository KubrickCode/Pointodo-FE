import { FC } from "react";
import { useModalStore } from "../../../store/modal.store";
import { MODAL_CONTENT_ADD_TASK } from "../../../shared/constants/modal.constant";

interface Props {
  tab: number;
  setOrder: (sorted: string) => void;
  checkedCompletion: boolean;
  setCheckedCompletion: (completion: boolean) => void;
}

const TaskHeader: FC<Props> = ({
  tab,
  setOrder,
  checkedCompletion,
  setCheckedCompletion,
}) => {
  const setModalState = useModalStore((state) => state.setModalState);

  return (
    <>
      <div className="p-3 flex flex-row justify-between">
        <div>
          <button
            className="bg-blue-500 rounded px-3 py-2 text-white hover:bg-blue-600 text-sm sm:text-base"
            onClick={() => setModalState(true, MODAL_CONTENT_ADD_TASK(tab))}
          >
            작업 추가
          </button>
          <select
            className="border px-3 py-2 ml-2 rounded outline-neutral-400 cursor-pointer dark:bg-neutral-600 dark:border-0 dark:text-neutral-200 text-sm sm:text-base"
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="importance">중요도 순</option>
            <option value="newest">최신 순</option>
            <option value="old">오래된 순</option>
            <option value="name">이름 순</option>
          </select>
        </div>
        <div
          className="ml-2 flex items-center cursor-pointer"
          onClick={() => setCheckedCompletion(!checkedCompletion)}
        >
          <input
            type="checkbox"
            checked={checkedCompletion}
            onChange={() => setCheckedCompletion(!checkedCompletion)}
            className="cursor-pointer"
          />
          <label className="ml-1 cursor-pointer dark:text-neutral-200 text-sm sm:text-base">
            완료 작업 숨기기
          </label>
        </div>
      </div>
    </>
  );
};

export default TaskHeader;
