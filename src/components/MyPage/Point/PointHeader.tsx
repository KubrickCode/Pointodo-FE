import { FC } from "react";

interface Props {
  setOrder: (order: string) => void;
}

const PointHeader: FC<Props> = ({ setOrder }) => {
  return (
    <>
      <div className="p-3">
        <select
          className="border px-3 py-2 ml-2 rounded outline-neutral-400"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="newest">최신 순</option>
          <option value="old">오래된 순</option>
        </select>
      </div>
    </>
  );
};

export default PointHeader;
