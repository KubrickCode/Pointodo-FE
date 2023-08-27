import { FC } from "react";
import {
  ACHIEVEMENT_BADGE,
  NORMAL_BADGE,
  SPECIAL_BADGE,
} from "../../../shared/constants/admin.constant";

interface Props {
  tab: number;
  setTab: (tab: number) => void;
}

const MyBadgeTab: FC<Props> = ({ tab, setTab }) => {
  return (
    <>
      <ul className="flex flex-row justify-evenly border-b">
        {myBadgeTabList.map((item) => (
          <li
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`${
              tab === item.id && "bg-blue-400 text-white"
            } w-full text-center p-5 cursor-pointer rounded-xl m-2 hover:bg-blue-300 hover:text-white`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

const myBadgeTabList = [
  {
    id: 0,
    name: "전체",
  },
  {
    id: 1,
    name: NORMAL_BADGE,
  },
  {
    id: 2,
    name: ACHIEVEMENT_BADGE,
  },
  {
    id: 3,
    name: SPECIAL_BADGE,
  },
];

export default MyBadgeTab;
