import { FC, useState } from "react";
import SideBar from "../SideBar/SideBar";
import MyBadge from "./Badge/MyBadge";
import MySetting from "./Setting/MySetting";
import PointsLogs from "./Point/Point";

const MyPage: FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <div className="sm:flex sm:flex-row">
        <SideBar menu={menu} tab={tab} setTab={setTab} />
        {tab === 0 && <MyBadge />}
        {tab === 1 && <MySetting setTab={setTab} />}
        {tab === 2 && <PointsLogs />}
      </div>
    </>
  );
};

const menu = [
  {
    id: 0,
    name: "뱃지 관리",
  },
  {
    id: 1,
    name: "내 정보 관리",
  },
  {
    id: 2,
    name: "포인트 내역",
  },
];

export default MyPage;
