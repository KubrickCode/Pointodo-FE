import { FC } from "react";

interface Props {
  tab: number;
}

const AdminBadgeHeader: FC<Props> = ({ tab }) => {
  return (
    <>
      <div className="m-3">
        <button className="bg-blue-400 text-white p-2 rounded">
          뱃지 추가
        </button>
      </div>
    </>
  );
};

export default AdminBadgeHeader;
