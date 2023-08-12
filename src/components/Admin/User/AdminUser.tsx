import { FC, useState } from "react";
import AdminUserTab from "./AdminUserTab";
import AdminUserList from "./AdminUserList";

const AdminUser: FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className="w-full">
      <AdminUserTab tab={tab} setTab={setTab} />
      <AdminUserList tab={tab} />
    </div>
  );
};

export default AdminUser;
