import { FC } from "react";
import SideBar from "../SideBar/SideBar";

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

const Main: FC = () => {
  return (
    <>
      <SideBar menu={menu} />
    </>
  );
};

export default Main;
