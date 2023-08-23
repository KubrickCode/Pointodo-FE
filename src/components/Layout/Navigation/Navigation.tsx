import { FC, useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { useQueryGet } from "../../../hooks/useQueryApi";
import { useUserStore } from "../../../store/user.store";
import { GET_CURRENT_POINTS_LINK } from "../../../shared/constants/point.constant";
import { QUERY_KEY_GET_CURRENT_POINTS } from "../../../shared/constants/query.constant";

const Navigation: FC = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const [pointInfo, setPointInfo] = useState(false);

  const { data: currentPoints } = useQueryGet(
    GET_CURRENT_POINTS_LINK,
    QUERY_KEY_GET_CURRENT_POINTS,
    {
      enabled: !!isLoggedIn,
    }
  );

  return (
    <>
      <nav
        className={`${
          !isLoggedIn && "hidden"
        } flex justify-between p-5 border-b`}
      >
        <div>
          <button
            className="flex flex-row items-center h-full"
            onClick={() => (location.href = "/")}
          >
            <h1 className="text-2xl mx-5 font-bold">Pointodo</h1>
          </button>
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 flex flex-row relative">
            <div
              className="mr-1"
              onMouseOver={() => setPointInfo(true)}
              onMouseLeave={() => setPointInfo(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="gray"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <div
                className={`absolute border bg-white p-4 rounded w-fit right-[-50px] top-10 ${
                  !pointInfo && "hidden"
                }`}
              >
                <p className="text-lg mb-2">※ 포인트 정책</p>
                <p className="whitespace-nowrap">- 매일 작업 완료 시 1포인트</p>
                <p className="whitespace-nowrap">- 기한 작업 완료 시 3포인트</p>
                <p className="whitespace-nowrap">
                  - 무기한 작업 완료 시 5포인트
                </p>
                <p className="whitespace-nowrap">
                  - 이틀 이상 연속으로 작업 완료 시 추가 1포인트
                </p>
                <p className="whitespace-nowrap">
                  - 포인트로 각종 뱃지 구매 가능
                </p>
              </div>
            </div>
            <span>보유 포인트: {currentPoints?.points}</span>
          </div>
          <ProfileDropdown />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
