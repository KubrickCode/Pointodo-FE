import { FC } from "react";

interface Props {
  menu: {
    id: number;
    name: string;
  }[];

  setTab: (tab: number) => void;
}

const SideBar: FC<Props> = ({ menu, setTab }) => {
  return (
    <>
      <nav className="border-r p-8 h-screen">
        <ul>
          {menu.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer my-5 py-3"
              onClick={() => setTab(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
