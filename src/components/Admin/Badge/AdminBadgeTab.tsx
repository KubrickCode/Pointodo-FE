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

const AdminBadgeTab: FC<Props> = ({ tab, setTab }) => {
  return (
    <>
      <ul className="flex flex-row justify-evenly border-b dark:border-neutral-600">
        {badgeTabList.map((item) => (
          <li
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`${
              tab === item.id && "bg-blue-400 text-white dark:bg-neutral-800"
            } w-full text-center p-5 cursor-pointer rounded-xl m-2 hover:bg-blue-300 hover:text-white dark:text-neutral-200 dark:hover:bg-neutral-900`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

const badgeTabList = [
  {
    id: 0,
    name: NORMAL_BADGE,
  },
  {
    id: 1,
    name: ACHIEVEMENT_BADGE,
  },
  {
    id: 2,
    name: SPECIAL_BADGE,
  },
];

export default AdminBadgeTab;
