import { FC, useState } from "react";
import AdminBadgeTab from "./AdminBadgeTab";
import AdminBadgeList from "./AdminBadgeList";
import AdminBadgeHeader from "./AdminBadgeHeader";

const AdminBadge: FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className="w-full">
      <AdminBadgeTab tab={tab} setTab={setTab} />
      <AdminBadgeHeader tab={tab} />
      <AdminBadgeList tab={tab} />
    </div>
  );
};

export default AdminBadge;
