import { FC, useState } from "react";
import SideBar from "../SideBar/SideBar";
import AdminBadge from "./Badge/AdminBadge";

const Admin: FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <div className="flex flex-row">
        <SideBar menu={menu} tab={tab} setTab={setTab} />
        {tab === 0 && <AdminBadge />}
      </div>
    </>
  );
};

const menu = [
  {
    id: 0,
    name: "뱃지 관리",
  },
];

export default Admin;
