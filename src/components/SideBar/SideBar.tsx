import { FC } from "react";

interface Props {
  menu: {
    id: number;
    name: string;
  }[];

  tab: number;
  setTab: (tab: number) => void;
}

const SideBar: FC<Props> = ({ menu, tab, setTab }) => {
  return (
    <>
      <nav className="border-r py-8 h-screen w-[15%]">
        <ul>
          {menu.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer my-5 py-3 px-8 w-full rounded-lg text-center ${
                item.id === tab && "bg-neutral-200"
              }`}
              onClick={() => setTab(item.id)}
            >
              {item.name === "DAILY"
                ? "매일 작업"
                : item.name === "DUE"
                ? "기한 작업"
                : "무기한 작업"}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
