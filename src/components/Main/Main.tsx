import { FC, useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Task from "./Task/Task";

const Main: FC = () => {
  const token = localStorage.getItem("accessToken");
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (!token) {
      location.href = "/auth";
    }
  }, [token]);

  return (
    <div className="flex flex-row">
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
