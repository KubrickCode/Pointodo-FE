import { FC, useState, useRef, useEffect } from "react";
import { useQueryMutate } from "./../../../hooks/useQueryApi";
import { useUserStore } from "../../../store/user.store";
import { Link } from "react-router-dom";

const ProfileDropdown: FC = () => {
  const [open, setOpen] = useState(false);
  const { mutate: logout } = useQueryMutate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useUserStore((state) => state.user);

  const handleLogout = async () => {
    logout(
      {
        link: "/auth/logout",
        method: "post",
      },
      {
        onSuccess: async () => {
          localStorage.removeItem("accessToken");
          location.href = "/";
        },
      }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <>
      <div className="relative border border-neutral-400 rounded-full">
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src={user?.selectedBadge.iconLink}
          onClick={() => setOpen(!open)}
        />

        <div
          ref={dropdownRef}
          className={`z-10 ${
            open ? "block" : "hidden"
          } absolute right-1 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 text-center`}
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <span className="font-medium truncate">{user?.email}</span>
          </div>
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
                작업 페이지
              </Link>
            </li>
            <li>
              <Link to="my-page" className="block px-4 py-2 hover:bg-gray-100">
                마이 페이지
              </Link>
            </li>
            <li>
              <button
                className="w-full px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </li>
            {(user?.role === "ADMIN" || user?.role === "MASTER") && (
              <li>
                <Link to="admin" className="block px-4 py-2 hover:bg-gray-100">
                  관리자 페이지
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
