import { FC } from "react";

interface Props {
  tab: number;
  setTab: (tab: number) => void;
}

const AdminUserTab: FC<Props> = ({ tab, setTab }) => {
  return (
    <>
      <ul className="flex flex-row justify-evenly border-b dark:border-neutral-600">
        {adminUserTabList.map((item) => (
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

const adminUserTabList = [
  {
    id: 0,
    name: "유저 목록",
  },
  {
    id: 1,
    name: "이달의 유저",
  },
];

export default AdminUserTab;
