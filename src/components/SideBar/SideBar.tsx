import { FC } from "react";

interface Prop {
  menu: {
    id: number;
    name: string;
  }[];
}

const SideBar: FC<Prop> = ({ menu }) => {
  return (
    <>
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
