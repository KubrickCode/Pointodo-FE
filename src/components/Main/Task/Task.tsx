import { FC, useState, useEffect } from "react";
import TaskList, { TaskEntity } from "./TaskList";
import TaskHeader from "./TaskHeader";
import { useQueryGet } from "../../../hooks/useQueryApi";

interface Props {
  tab: number;
}

const Task: FC<Props> = ({ tab }) => {
  const [data, setData] = useState<TaskEntity[]>([]);
  const [sorted, setSorted] = useState("중요도 순");

  const { data: dailyTasks } = useQueryGet("/task/daily", "getDailyTasks", {
    enabled: tab === 0,
  });

  const { data: dueTasks } = useQueryGet("/task/due", "getDueTasks", {
    enabled: tab === 1,
  });

  const { data: freeTasks } = useQueryGet("/task/free", "getFreeTasks", {
    enabled: tab === 2,
  });

  useEffect(() => {
    if (tab === 0) {
      setData(dailyTasks);
    }
    if (tab === 1) {
      setData(dueTasks);
    }
    if (tab === 2) {
      setData(freeTasks);
    }
  }, [tab, dailyTasks, dueTasks, freeTasks]);

  useEffect(() => {
    let sortedData = [...data];

    if (sorted === "중요도 순") {
      sortedData.sort((a, b) => {
        return a.importance - b.importance;
      });
    }

    if (sorted === "최신 순") {
      sortedData.sort((a, b) => {
        return (
          new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
        );
      });
    }

    if (sorted === "오래된 순") {
      sortedData.sort((a, b) => {
        return (
          new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime()
        );
      });
    }

    if (sorted === "이름 순") {
      sortedData.sort((a, b) => {
        const upperCaseA = a.name.toUpperCase();
        const upperCaseB = b.name.toUpperCase();
        if (upperCaseA < upperCaseB) return -1;
        if (upperCaseA > upperCaseB) return 1;
        return 0;
      });
    }

    setData(sortedData);
  }, [sorted]);

  return (
    <div className="w-full">
      <TaskHeader tab={tab} setSorted={setSorted} />
      <TaskList tab={tab} data={data} />
    </div>
  );
};

export default Task;
