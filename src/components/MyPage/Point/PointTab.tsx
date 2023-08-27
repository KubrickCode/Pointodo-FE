import { FC } from "react";

interface Props {
  tab: number;
  setTab: (tab: number) => void;
}

const PointTab: FC<Props> = ({ tab, setTab }) => {
  return (
    <>
      <ul className="flex flex-row justify-evenly border-b">
        {pointTabList.map((item) => (
          <li
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`${
              tab === item.id && "bg-neutral-200"
            } w-full text-center p-5 cursor-pointer`}
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
