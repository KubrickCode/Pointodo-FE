import { FC } from "react";
import { TaskType } from "../../entities/task.entity";
import {
  DAILY_TASK,
  DUE_TASK,
  FREE_TASK,
} from "../../shared/constants/task.constant";

interface Props {
  menu: {
    id: number;
    name: string | TaskType;
  }[];

  tab: number;
  setTab: (tab: number) => void;
}

const SideBar: FC<Props> = ({ menu, tab, setTab }) => {
  return (
    <>
      <nav className="border-r sm:py-8 sm:h-screen sm:w-[15%]">
        <ul className="grid grid-cols-3 sm:flex sm:flex-col mx-2">
          {menu.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer my-5 py-3 px-8 w-full rounded-lg text-center hover:bg-blue-300 hover:text-white ${
                item.id === tab && "bg-blue-400 text-white"
              }`}
              onClick={() => setTab(item.id)}
            >
              {item.name === TaskType.DAILY
                ? DAILY_TASK
                : item.name === TaskType.DUE
                ? DUE_TASK
                : item.name === TaskType.FREE
                ? FREE_TASK
                : item.name}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
