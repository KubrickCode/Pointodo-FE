import { FC } from "react";

interface Props {
  tab: number;
  setTab: (tab: number) => void;
}

const PointTab: FC<Props> = ({ tab, setTab }) => {
  return (
    <>
      <ul className="flex flex-row justify-evenly border-b">
        <li
          onClick={() => setTab(0)}
          className={`${
            tab === 0 && "bg-neutral-200"
          } w-full text-center p-5 cursor-pointer`}
        >
          적립 포인트 내역
        </li>
        <li
          onClick={() => setTab(1)}
          className={`${
            tab === 1 && "bg-neutral-200"
          } w-full text-center p-5 cursor-pointer`}
        >
          소모 포인트 내역
        </li>
      </ul>
    </>
  );
};

export default PointTab;
