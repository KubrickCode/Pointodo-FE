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
    name: "매일 작업",
  },
  {
    id: 1,
    name: "기한 작업",
  },
  {
    id: 2,
    name: "무기한 작업",
  },
];

export default Main;
