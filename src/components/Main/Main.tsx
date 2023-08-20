import { FC, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Task from "./Task/Task";

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
    name: "DAILY",
  },
  {
    id: 1,
    name: "DUE",
  },
  {
    id: 2,
    name: "FREE",
  },
];

export default Main;
