import { FC, useEffect } from "react";
import { useQueryGet } from "../../../hooks/useQueryApi";
import { useModalStore } from "../../../store/modal.store";

interface Props {
  tab: number;
}

const Task: FC<Props> = ({ tab }) => {
  const setModalState = useModalStore((state) => state.setModalState);

  const { data: dailyTasks } = useQueryGet("/task/daily", "getDailyTasks", {
    enabled: tab === 0,
  });

  const { data: deadlineTasks } = useQueryGet(
    "/task/deadline",
    "getDeadlineTasks",
    {
      enabled: tab === 1,
    }
  );

  const { data: freeTasks } = useQueryGet("/task/free", "getFreeTasks", {
    enabled: tab === 2,
  });

  useEffect(() => {
    console.log(tab);
    console.log(deadlineTasks);
  }, [deadlineTasks, tab]);

  return (
    <div>
      <button
        className="bg-neutral-200"
        onClick={() => setModalState(true, "addTask")}
      >
        작업 추가
      </button>
      <div>{dailyTasks}</div>
      <div>{deadlineTasks}</div>
      <div>{freeTasks}</div>
    </div>
  );
};

export default Task;
