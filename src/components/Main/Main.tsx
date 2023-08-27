import { FC, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Task from "./Task/Task";
import { TaskType } from "../../entities/task.entity";

const Main: FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="sm:flex sm:flex-row">
      <SideBar menu={menu} tab={tab} setTab={setTab} />
      <Task tab={tab} />
    </div>
  );
};

const menu = [
  {
    id: 0,
    name: TaskType.DAILY,
  },
  {
    id: 1,
    name: TaskType.DUE,
  },
  {
    id: 2,
    name: TaskType.FREE,
  },
];

export default Main;
