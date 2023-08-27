import { FC } from "react";

interface Props {
  tab: number;
  setTab: (tab: number) => void;
}

const PointTab: FC<Props> = ({ tab, setTab }) => {
  return (
    <>
      <ul className="flex flex-row justify-evenly border-b dark:border-neutral-600">
        {pointTabList.map((item) => (
          <li
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`${
              tab === item.id && "bg-blue-400 text-white dark:bg-neutral-800"
            } w-full text-center p-5 cursor-pointer rounded-xl m-2 hover:bg-blue-300 hover:text-white dark:hover:bg-neutral-900 dark:text-neutral-200`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

const pointTabList = [
  {
    id: 0,
    name: "적립 포인트 내역",
  },
  {
    id: 1,
    name: "소모 포인트 내역",
  },
];

export default PointTab;
