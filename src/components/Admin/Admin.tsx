import { FC, useEffect, useState } from "react";
import { useUserStore } from "../../store/user.store";
import SideBar from "../SideBar/SideBar";
import AdminBadge from "./Badge/AdminBadge";

const Admin: FC = () => {
  const user = useUserStore((state) => state.user);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (user?.role !== ("MASTER" || "ADMIN")) {
      location.href = "/";
    }
  }, [user]);

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
