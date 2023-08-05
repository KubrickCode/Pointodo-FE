import { FC } from "react";
import ProfileDropdown from "./ProfileDropdown";

const Navigation: FC = () => {
  const token = localStorage.getItem("accessToken");

  return (
    <>
      <nav className={`${!token && "hidden"} flex justify-between p-5`}>
        <div>
          <button
            className="flex flex-row items-center"
            onClick={() => (location.href = "/")}
          >
            <h1 className="text-2xl mx-5 font-bold">Pointodo</h1>
          </button>
        </div>
        <ProfileDropdown />
      </nav>
    </>
  );
};

export default Navigation;
