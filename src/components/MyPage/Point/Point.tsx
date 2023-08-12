import { FC, useState } from "react";
import PointTab from "./PointTab";
import PointsLogs from "./PointsLogs";
import PointHeader from "./PointHeader";

const Point: FC = () => {
  const [tab, setTab] = useState(0);
  const [order, setOrder] = useState("newest");

  return (
    <div className="w-full">
      <PointTab tab={tab} setTab={setTab} />
      <PointHeader setOrder={setOrder} />
      <PointsLogs tab={tab} order={order} />
    </div>
  );
};

export default Point;
