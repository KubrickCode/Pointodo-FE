import { FC, useState } from "react";
import TaskList from "./TaskList";
import TaskHeader from "./TaskHeader";

interface Props {
  tab: number;
}

const Task: FC<Props> = ({ tab }) => {
  const [order, setOrder] = useState("importance");
  const [checkedCompletion, setCheckedCompletion] = useState(true);

  return (
    <div className="w-full">
      <TaskHeader
        tab={tab}
        setOrder={setOrder}
        checkedCompletion={checkedCompletion}
        setCheckedCompletion={setCheckedCompletion}
      />
      <TaskList tab={tab} order={order} checkedCompletion={checkedCompletion} />
    </div>
  );
};

export default Task;
