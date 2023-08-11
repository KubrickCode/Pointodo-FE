import { FC, useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Task from "./Task/Task";
import { useUserStore } from "../../store/user.store";

const Main: FC = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      location.href = "/auth";
    }
  }, [isLoggedIn]);

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
