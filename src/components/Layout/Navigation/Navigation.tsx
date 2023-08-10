import { FC } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { useQueryGet } from "../../../hooks/useQueryApi";

const Navigation: FC = () => {
  const token = localStorage.getItem("accessToken");
  const { data: currentPoints } = useQueryGet("/point/current", "getPoints", {
    enabled: !!token,
  });

  return (
    <>
      <nav
        className={`${!token && "hidden"} flex justify-between p-5 border-b`}
      >
        <div>
          <button
            className="flex flex-row items-center"
            onClick={() => (location.href = "/")}
          >
            <h1 className="text-2xl mx-5 font-bold">Pointodo</h1>
          </button>
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2">보유 포인트: {currentPoints?.points}</div>
          <ProfileDropdown />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
