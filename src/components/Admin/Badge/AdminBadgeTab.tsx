import { FC } from "react";

interface Props {
  tab: number;
  setTab: (tab: number) => void;
}

const AdminBadgeTab: FC<Props> = ({ tab, setTab }) => {
  return (
    <>
      <ul className="flex flex-row justify-evenly border-b">
        <li
          onClick={() => setTab(0)}
          className={`${
            tab === 0 && "bg-neutral-200"
          } w-full text-center p-5 cursor-pointer`}
        >
          일반 뱃지
        </li>
        <li
          onClick={() => setTab(1)}
          className={`${
            tab === 1 && "bg-neutral-200"
          } w-full text-center p-5 cursor-pointer`}
        >
          업적 뱃지
        </li>
        <li
          onClick={() => setTab(2)}
          className={`${
            tab === 2 && "bg-neutral-200"
          } w-full text-center p-5 cursor-pointer`}
        >
          특별 뱃지
        </li>
      </ul>
    </>
  );
};

export default AdminBadgeTab;
