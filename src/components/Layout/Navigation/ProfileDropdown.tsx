import { FC, useState, useRef, useEffect, useCallback } from "react";
import { useQueryMutate } from "./../../../hooks/useQueryApi";
import { useUserStore } from "../../../store/user.store";
import { Link } from "react-router-dom";
import { LOGOUT_LINK } from "../../../shared/constants/auth.constant";
import { Role } from "../../../entities/user.entity";
import DarkModeButton from "./DarkModeButton";

const ProfileDropdown: FC = () => {
  const user = useUserStore((state) => state.user);

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { mutate: logout } = useQueryMutate();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    },
    [dropdownRef.current]
  );

  const handleLogout = useCallback(async () => {
    logout(
      {
        link: LOGOUT_LINK,
        method: "post",
      },
      {
        onSuccess: async () => {
          localStorage.removeItem("themeStore");
          location.href = "/";
        },
      }
    );
  }, []);

  return (
    <>
      <div
        className="relative border border-neutral-400 rounded-full"
        ref={dropdownRef}
      >
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src={user?.iconLink}
          onClick={() => setOpen(!open)}
        />

        <div
          className={`z-10 ${
            open ? "block" : "hidden"
          } absolute right-1 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 text-center dark:bg-neutral-800 dark:divide-gray-600`}
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <span className="font-medium truncate dark:text-neutral-200">
              {user?.email}
            </span>
          </div>
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
              >
                작업 페이지
              </Link>
            </li>
            <li>
              <Link
                to="my-page"
                className="block px-4 py-2 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
              >
                마이 페이지
              </Link>
            </li>
            <li>
              <button
                className="w-full px-4 py-2 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </li>
            <li>
              <DarkModeButton />
            </li>
            {(user?.role === Role.ADMIN || user?.role === Role.MASTER) && (
              <li>
                <Link
                  to="admin"
                  className="block px-4 py-2 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
                >
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
