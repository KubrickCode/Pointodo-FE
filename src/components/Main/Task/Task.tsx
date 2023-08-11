import { FC, useState, useEffect } from "react";
import TaskList, { TaskEntity } from "./TaskList";
import TaskHeader from "./TaskHeader";

interface Props {
  tab: number;
}

const Task: FC<Props> = ({ tab }) => {
  const [sorted, setSorted] = useState("importance");

  return (
    <div className="w-full">
      <TaskHeader tab={tab} setSorted={setSorted} />
      <TaskList tab={tab} sorted={sorted} />
    </div>
  );
};

export default Task;
