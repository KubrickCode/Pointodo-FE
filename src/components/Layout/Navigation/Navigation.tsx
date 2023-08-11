import { FC } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { useQueryGet } from "../../../hooks/useQueryApi";
import { useUserStore } from "../../../store/user.store";

const Navigation: FC = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { data: currentPoints } = useQueryGet("/point/current", "getPoints", {
    enabled: !!isLoggedIn,
  });

  return (
    <>
      <nav
        className={`${
          !isLoggedIn && "hidden"
        } flex justify-between p-5 border-b`}
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
