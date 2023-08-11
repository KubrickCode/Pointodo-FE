import { FC, useState, useEffect } from "react";
import TaskList, { TaskEntity } from "./TaskList";
import TaskHeader from "./TaskHeader";

interface Props {
  tab: number;
}

const Task: FC<Props> = ({ tab }) => {
  const [order, setOrder] = useState("importance");

  return (
    <div className="w-full">
      <TaskHeader tab={tab} setOrder={setOrder} />
      <TaskList tab={tab} order={order} />
    </div>
  );
};

export default Task;
