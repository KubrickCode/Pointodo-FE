import { FC, useState } from "react";
import MyBadgeTab from "./MyBadgeTab";
import MyBadgeList from "./MyBadgeList";

const MyBadge: FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className="w-full">
      <MyBadgeTab tab={tab} setTab={setTab} />
      <MyBadgeList tab={tab} />
    </div>
  );
};

export default MyBadge;
