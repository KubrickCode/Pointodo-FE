import { FC, useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskHeader from "./TaskHeader";
import { useQueryGet } from "../../../hooks/useQueryApi";

interface Props {
  tab: number;
}

const Task: FC<Props> = ({ tab }) => {
  const [data, setData] = useState([]);

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
    if (tab === 0) {
      setData(dailyTasks);
    }
    if (tab === 1) {
      setData(deadlineTasks);
    }
    if (tab === 2) {
      setData(freeTasks);
    }
  }, [tab, dailyTasks, deadlineTasks, freeTasks]);

  return (
    <div className="w-full">
      <TaskHeader tab={tab} />
      <TaskList data={data} />
    </div>
  );
};

export default Task;
