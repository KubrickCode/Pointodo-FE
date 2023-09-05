import { FC, useState } from "react";
import AdminUserTab from "./AdminUserTab";
import AdminUserList from "./AdminUserList";
import AdminTopUserList from "./AdminTopUserList";

const AdminUser: FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className="w-full">
      <AdminUserTab tab={tab} setTab={setTab} />
      {tab === 0 && <AdminUserList tab={tab} />}
      {tab === 1 && <AdminTopUserList tab={tab} />}
    </div>
  );
};

export default AdminUser;
