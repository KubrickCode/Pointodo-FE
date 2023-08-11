import { FC, useState } from "react";
import PointTab from "./PointTab";
import PointsLogs from "./PointsLogs";

const Point: FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="w-full">
      <PointTab tab={tab} setTab={setTab} />
      <PointsLogs tab={tab} />
    </div>
  );
};

export default Point;
